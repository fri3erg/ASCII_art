# ricordi 📸

Five photos, redrawn with letters, one after another in a loop. They're impressions more than copies: only
the main subject is filled in, its outline glows, and everything else fades to black. Each gets ten seconds
and its own small bit of life before it breaks up into golden sparks and makes room for the next:

1. **Bologna**: the march, with the crowd in colour, both towers whole (their bases are hidden in the photo,
   so I extended them) and the flags glowing. It draws itself from the top down, the flags wave, swifts
   circle the towers and the crowd jumps.
2. **Cherry blossoms**: him and a pink cloud of blossom. It spreads out from the smile, and petals keep
   drifting down.
3. **The manta**: the manta and the diver as glowing cyan silhouettes. The photo only shows one wing and
   stops at the waist, so the other wing is mirrored from the first and the legs and fins are drawn in,
   kicking slowly. The manta flaps its wings, and bubbles rise from the diver.
4. **Laurea**: it bursts out from the raised fist, which keeps pumping, with confetti falling and champagne
   bubbles rising from the bottle.
5. **The kiss**: blowing a kiss, with hearts flying out of the hands and growing as they come towards you.

The photos sit in this folder, shrunk to 1000 px, but they are gitignored: they never go to GitHub, so
deploy from this folder with the Vercel CLI (below) for them to be online. Anyone with the link can see them.

## putting it online

Deploy from your computer, not from GitHub: the photos are gitignored, so a deploy from the repo would
have none. In `projects/ricordi`, run `npx vercel --prod`; the first time it asks to link a project (framework
**Other**, no build settings).

To preview it on your computer, run `npx serve projects/ricordi` and open the address it prints. Opening
`index.html` directly won't show the photos, because browsers don't let a page opened from disk read image pixels.
