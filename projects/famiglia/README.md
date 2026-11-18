# famiglia 🏡

The people (and animals) at home, redrawn with letters, one after another in a loop. Like *ricordi*, each
photo is an impression rather than a copy: only the subject is filled in, its outline glows, the rest goes
black, and each one gets its own small animation:

1. **Anna** on the horse with the pink ear bonnet. The horse flicks its ears and golden motes drift in the
   low sun.
2. **Mamma** in the rhinestone glasses. The stones glint in rainbow colours one after another, and the
   peace sign waves.
3. **Papà** with the Swedish flag. The flag waves and blue and yellow confetti falls.
4. **Me** in the toga and laurel crown, with rose petals drifting down.
5. **The cat** on its stump at sunset, under pink clouds, with fireflies over the meadow.
6. **The dog** in its striped hat, with little stars twinkling around it.

The photos sit in this folder, shrunk to 1000 px, but they are gitignored: they never go to GitHub, so
deploy from this folder with the Vercel CLI (below) for them to be online. Anyone with the link can see them.

## putting it online

Deploy from your computer, not from GitHub: the photos are gitignored, so a deploy from the repo would
have none. In `projects/famiglia`, run `npx vercel --prod`; the first time it asks to link a project (framework
**Other**, no build settings).

To preview it on your computer, run `npx serve projects/famiglia` and open the address it prints. Adding
`?t=30` to the address jumps 30 seconds into the loop.
