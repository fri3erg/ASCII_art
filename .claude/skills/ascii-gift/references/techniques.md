# Techniques

Recipes for `scene(t)`, written against the template's helpers (`set`, `put`, `X`, `Y`, `colOf`, `rowOf`,
`smoothstep`, `mix3`, `rnd`, `hash3`, `vnoise`, `tame`). Full working versions are in
`projects/kebabbo/index.html`.

Contents: 1 text that writes and dissolves · 2 turning 3D objects · 3 spheres · 4 particles · 5 neon signs ·
6 things in front of / behind others · 7 photo reveals · 8 phone layouts · 9 shading and colour

## 1. Text that writes itself, then dissolves into the scene

`buildText(lines, {y, maxW, maxH})` once in `setup()`, then `drawText(T, t, {start, perLetter, leaveAt})`
each frame. Letters appear in order; after `leaveAt` each cell leaves at its own random moment, turning
into a golden spark. Start the main scene a little before the words finish leaving, so it grows through
them:

```js
const SCENE_DELAY = 5.6;
function scene(t) {
  clearBackground();
  if (t > SCENE_DELAY) drawMainScene(t - SCENE_DELAY);   // main scene uses its own clock
  drawText(GREETING, t, { start: 0.4, perLetter: 0.1, leaveAt: 5.4, leaveSpread: 1.8 });
}
```

Emoji in text keep their own colours (they are rasterised with a colour-emoji font). On portrait screens,
split greetings into more, shorter lines so the letters can be bigger.

## 2. A turning 3D object (surface of revolution: döner, vase, cake, bottle, tree)

Describe the object by its radius at each height, `R(y)`. For each row inside it, for each cell with
`|x| < R`, the point on the visible front surface has `s = x / R`, `phi = asin(s)`, and its angle on
the object is `a = phi + spin`. Anything indexed by `a` (texture, spots, stripes) turns with the object:

```js
const R = radiusAt(y), dR = radiusAt(y + 0.5) - radiusAt(y - 0.5);
const s = x / R, phi = Math.asin(s), cphi = Math.cos(phi), a = phi + t * SPIN;
const nl = Math.hypot(s, dR, cphi);                       // surface normal: x right, y down, z to viewer
const diff = Math.max(0, (s * L[0] - dR * L[1] + cphi * L[2]) / nl);
```

- **Seamless texture around it**: noise sampled on a circle, so there is no seam at 360°:
  `around(a, y, f, fy, seed) = vnoise(cos(a)*f + seed*5.3, sin(a)*f + seed*2.1, y*fy)`.
- **Lumpy silhouette that turns with it**: scale `R` separately for the left and right edges with
  `around(spin ∓ π/2, y, ...)`, and use `s = x / (x < 0 ? Rl : Rr)`.
- **Layers / stripes**: `Math.sin(y * k + noise)`, darkened where close to 1 (grooves).
- **Rim light** from a fire or a lamp behind on one side: `Math.pow(clamp(s), 3)` mixed towards a warm colour.
- **Specks that glint as they come round**: `hash3(floor(a*26), floor(y*1.3), 9) % 100 < 5`, with
  brightness `pow(diff, 8)`.
- Round the top and bottom of the profile (`R *= sqrt(clamp(v / 0.05))`) or it looks cut off.

## 3. Spheres (fruit, planets, bubbles, eyes)

```js
const dx = (X[c] - cx) / (r * squash), dy = (Y[row] - cy) / r, d2 = dx*dx + dy*dy;
if (d2 < 1) { const nz = Math.sqrt(1 - d2), diff = Math.max(0, dx*L[0] + dy*L[1] + nz*L[2]); ... }
```

Add a highlight with `pow(diff, 14)` mixed towards white. Features that turn with it (a tomato's leaves, a
planet's bands) use the angle `asin(dx / sqrt(1 - dy*dy)) + spin`.

## 4. Particles, with no state kept between frames

Each particle `k` lives in repeating cycles; everything about one life comes from `rnd(k, cycle, n)`:

```js
for (let k = 0; k < COUNT; k++) {
  const life = 2 + rnd(k, 1) * 2, ph = t / life + rnd(k, 2), cyc = Math.floor(ph), u = ph - cyc;  // u: 0..1 through this life
  const x = (rnd(k, cyc, 3) - 0.5) * 40, y = startY - u * 60;
  put(x, y, 0.5 * (1 - u), 1, 0.55, 0.15);
}
```

- **Falling** (drips, petals, crumbs): `y = y0 + g * dt * dt`. Stop drawing when it hits the floor.
- **Rising** (embers, steam, bubbles): steam is a few dim cells (`lum ≈ 0.15`) with a sideways `sin` sway;
  embers are single bright cells that twinkle with `hash3(k, floor(t*12), 10) % 4`.
- **Things peeling off a contact point** (shavings): a peel stage where a curled strip grows from the
  contact point, then a fall stage that tumbles (rotate the strip's angle with `dt`). Draw chunks as
  short arcs with a darker outer row and a lighter inner row. Chunks of 4 to 6 cells read well; 1 or 2 cells
  read as dust.
- **Fireflies / twinkles**: on empty cells only, `hash3(c, r + floor(t*4), 77) % 1000 < 2`.

## 5. Neon signs

- Font: Bungee (thick, blocky). Rasterise with `buildText`, one colour per word (amber + hot pink works).
- **Halo**: blur the coverage a few cells (a box blur, 4 columns by 2 rows) and draw that dimly where there is
  no letter, in a darker shade of the letter's colour. The template's glow pass does the bloom.
- **Switch-on**: letter `k` turns on at `0.6 + k*0.12` and flickers for 0.4 s first:
  `hash3(k, floor(t*22), 5) % 3 ? 1 : 0.12`.
- **Broken letter**: one letter buzzes for 0.7 s every 6.5 s: `hash3(k, floor(t*16), 6) % 2 ? 1 : 0.2`.
- Keep letter colours below white (largest channel about 0.6), or the sign reads as plain white.

## 6. Things in front of and behind other things (a sword in a döner, a ribbon round a box)

Draw the object in its own coordinates. For a long object (a blade, a ribbon, a banner), use `u` along its
axis and `v` across it:

```js
const dx = X[c] - ox, dy = Y[r] - oy;
const u = dx * cos(ang) + dy * sin(ang), v = -dx * sin(ang) + dy * cos(ang);
```

Then shape it by ranges of `u` (blade, guard, grip, pommel) and the allowed `v` at each `u`. A **curve**
is an offset of the centre line, `vv = v - bend(u)`. A **flaring width** is a `smoothstep` on `u`. Make it
asymmetric (thin spine on one side, broad belly on the other) for a scimitar-like look.

For the part that should be **behind** another object, draw the whole thing before that object, which then
covers it. To know where it disappears (for example, to spawn shavings there), scan along the centre line
for the first point outside the other object's silhouette, once in setup.

## 7. Photo reveals

`drawPhoto(P, t, {start, speed})` reveals as a ripple from the centre. Variations, all just a different
`appear` per cell:

- **Scanline**: `smoothstep(start + r * 0.02, start + r * 0.02 + 0.3, t)`.
- **Develop like a polaroid**: everything appears at once, with lum ramping from 0 over 3 s, and colour
  mixed from grey to full.
- **Glitch**: before settling, offset rows sideways with `(hash3(r, floor(t*15), 3) % 7 - 3)` for a second.
- **Letters spell the photo**: replace `RAMP` with the letters of a name or a word, so the photo is drawn
  only with them. Keep a space at level 0, and order the letters roughly from light to dense.

## 8. Phone layouts

- The template already gives portrait screens more rows and a taller box; place things with fractions of
  `SCENE_H`, or check `PORTRAIT`.
- Split text into more lines on portrait. A sign or greeting should be at least 10 rows tall.
- Wide objects (hilts, banners) must stay inside about ±46 units of x on a 390 px-wide phone; check the
  phone screenshot for anything cut off at the edges.
- If a scene is laid out for a fixed height, an extra-rows offset plus a soft fade at the bottom
  (`lum *= 1 - smoothstep(150, 170, y)`) lets you zoom out without showing where things are cut off.

## 9. Shading and colour

- Light from the upper left and slightly in front, e.g. `L = norm(-0.45, -0.2, 0.87)`. Shade with
  `lum = ambient + k * diff` (ambient about 0.3, or the dark side vanishes, since cells below 0.06 are empty).
- Keep the colours of one object in a narrow family and vary `lum` for form; 3 or 4 named colours per object
  are enough (for meat: SEAR, GOLD, FRESH, CHAR).
- A faint dotted haze behind the subject (about 30% of cells at lum 0.1) makes the black feel like a space,
  not empty.
