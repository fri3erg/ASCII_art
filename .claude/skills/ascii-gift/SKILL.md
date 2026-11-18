---
name: ascii-gift
description: Make animated ASCII-art web pages (a picture drawn with letters on black, glowing and moving) to send someone as a link, and deploy them on Vercel. Use whenever the user wants virtual flowers, a greeting, a love note, a birthday or thank-you page, a joke page, a neon sign, a spinning or animated object, or one of their photos turned into ASCII/letter art, even if they don't say "ASCII". Also use to change, restyle or fix an existing page in this repo's projects/ folder, or to brainstorm ideas for the next one.
---

# ASCII gift pages

Each gift is one self-contained `index.html` (no build step) that draws an animated picture out of
characters on a black page, then gets its own Vercel link. The person receiving it just opens the link,
usually on a phone, so it has to look good and stay readable on a narrow screen.

## Repo layout

```
projects/<name>/index.html   one folder per gift, one Vercel project each
projects/<name>/README.md    what it shows, how to deploy, credits
projects/<name>/photo.jpg    (optional) a photo the page draws
sources/                     third-party originals kept for reference, never deployed
README.md                    short list of every project, one line each
```

When adding a project, also add its line to the root README. Write READMEs in a plain, warm, first-person
voice (the user asked for "more human"): no emoji walls, no marketing tone.

## Workflow

1. **Pin down the idea** in a sentence or two: what is on screen, what moves, any words (exact
   spelling, language, emoji), and who receives it. Ask only about what you can't sensibly choose yourself.
2. **Start from the template**: copy `assets/template.html` (in this skill's folder) to
   `projects/<name>/index.html`. It already has the grid, the renderer with glow, phone handling, text
   rendering with per-letter animation, and photo sampling. You mostly write `setup()` and `scene(t)`.
   For an idea close to an existing project, reading that project is a quicker start:
   - `projects/kebabbo/index.html`: 3D object turning (döner), particles, a sword passing behind it, neon sign
   - `projects/maddy-lilies/index.html`: greeting that dissolves into a scene (built on a third-party renderer)
3. **Build the scene**: see "How the engine works" below, and `references/techniques.md` for ready
   recipes (3D surfaces of revolution, spheres, particles, neon flicker, dissolves, photo reveals, things
   passing behind other things).
4. **Look at it**: run the screenshot script (see "Checking your work") at several moments, at desktop
   and phone size, and actually look at the images before saying anything works. Animation bugs (text
   clipping to white, something cropped on phones, an object hidden behind another) only show up visually.
5. **Iterate with the user** in small visual steps. Users steer by look ("bigger chunks", "curved
   upwards", "closer"); make the change, screenshot, and describe what changed in plain words. When a
   request is ambiguous ("closer" = nearer the object, or bigger as if nearer the viewer?), pick the
   likelier reading, do it, and say which you chose.
6. **Ship**: commit and push only when the user asks. Then point them to Vercel (below).

## How the engine works (template)

- **Units, not pixels.** The scene lives in a `SCENE_W x SCENE_H` box (84 x 122; 84 x 140 on phones) that
  is centred and always fits the screen. One row = 1 unit tall, a column = `UNIT` (about 0.5) units wide,
  so units are square: circles stay round. `X[c]` and `Y[r]` give the scene position of each cell;
  `colOf(x)`, `rowOf(y)` go the other way. x = 0 is the centre, y = 0 the top of the box.
- **Two arrays per frame**: `lum[i]` (0..1, picks how dense a character is) and `rgb[i*3..]` (colour).
  `scene(t)` fills them; the renderer turns them into characters, which reshuffle 10 times a second so
  the picture shimmers. Below lum 0.06 a cell is empty.
- **Draw order is depth.** Draw far things first; `set()` overwrites. To put something behind an object,
  draw it before the object (the sword's tip disappears behind the döner this way). `put(x, y, ..., front)`
  only overwrites a darker cell unless `front` is true.
- **Colour clipping.** The renderer brightens colours up to ~1.8x, so saturated colours turn white. Keep
  every colour's largest channel around 0.6 (`tame()` does this). Shading should come from `lum`, not
  from making the colour brighter.
- **Time.** `t` is seconds since start (fonts are loaded first). Everything must be a pure function of `t`:
  no state carried between frames. For randomness use `rnd(a, b, c)` / `hash3`, seeded with an object
  index and its cycle number, so things are random but stable and loop forever.
- **Phones.** Portrait screens get more rows (a finer grid) rather than a cropped picture, and the box
  is taller (140), which leaves room for text on two lines. Text must be legible at about 180 columns: split
  long lines on portrait (`PORTRAIT ? ["KEBABBO", ".TOP"] : ["KEBABBO.TOP"]`) and use thick fonts.
- **Fonts.** Google Fonts loaded in `<head>` and listed in `FONTS_TO_WAIT_FOR`. Thick fonts survive being
  turned into characters: Bungee (blocky, signs), Pacifico (handwriting). Thin fonts turn to mush.
- **Performance.** The cost is roughly the number of cells (`COLS*ROWS`, about 25 to 45 thousand) plus
  whatever you compute per lit cell. Loop only over each object's bounding rows and columns, and don't allocate
  arrays inside per-cell loops when you can avoid it.

## Photos

`PHOTO = "photo.jpg"` in the template draws the user's photo as coloured characters, revealed as a ripple,
with the message underneath. Things to handle:

- **Privacy.** A photo in the project folder is published on a public URL. Say so before adding someone's
  photo, and never invent or fetch photos of real people yourself: use the file the user gives.
- **Size.** Resize big photos to about 1200 px on the long side before adding them (the page only samples
  a few hundred cells across anyway). Crop around the subject, since faces read best when they fill the box.
- **Local preview.** Browsers block reading pixels from images on pages opened as files, so preview over
  http (`npx serve projects/<name>`); the screenshot script already does this.
- **What reads well**: strong contrast and a simple background. The template stretches contrast
  automatically; for a dark or busy photo, raise the gamma in `loadPhoto` or blur the background before
  adding it.

## Checking your work

`scripts/shoot.mjs` serves a project folder over http, opens it in the local Chrome or Edge (via
puppeteer-core) and saves `desk_<s>.png` (1280x800) and `phone_<s>.png` (390x844 @2x) at chosen seconds,
printing any page errors. Install puppeteer-core once in a scratch folder (not in the repo), copy the
script there and run it from there:

```bash
cd <scratch>/pp && npm i puppeteer-core@23.11.1          # once
cp <skill>/scripts/shoot.mjs . && node shoot.mjs <repo>/projects/<name> <scratch>/shots 1,3,6,12
```

Pick moments that cover each phase (intro, transitions, the steady loop). To inspect a detail, add a
cropped screenshot (`page.screenshot({clip})`). Headless Chrome's `--virtual-time-budget` stalls on
these never-ending animations, so use real time like the script does.

## Deploying

Vercel: Add New → Project, import the repo, set **Root Directory** to `projects/<name>`, framework preset
**Other**, leave the build settings empty, then deploy. Each gift gets its own Vercel project from the same repo, and pushes
to `main` redeploy them. Messaging apps cache link previews (`<title>`, `og:title`, `og:description`), so
get those right before the link is first shared.

On this Windows machine, PowerShell mangles commit messages that contain double quotes. Write the
message to a file in the scratchpad and use `git commit -F <file>` from bash.

## Credits

If a page borrows someone else's art or code, keep the untouched original in `sources/<author-repo>/`,
note the commit it was copied from, and credit it in the project's README (say if there is no license).
