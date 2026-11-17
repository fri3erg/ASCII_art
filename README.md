# ASCII art

Small animated ASCII-art pages, one folder per project. Each project is a self-contained static site
(a single `index.html`, no build step), so each one deploys as its own Vercel project.

```
projects/
  maddy-lilies/        greeting "ehy maddy, per te 👉👈" that dissolves into an animated lily bouquet
sources/
  arimecoa-giveaway/   original pages the projects are based on (reference copies, not deployed)
```

## New project

1. Copy an existing project folder (or a file from `sources/`) to `projects/<name>/index.html`.
2. Preview it by opening `index.html` in a browser.

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo.
3. Set **Root Directory** to `projects/<name>` (e.g. `projects/maddy-lilies`).
   Framework preset: **Other**. Leave the build and output settings empty.
4. Deploy. Every project is a separate Vercel project pointing at the same repo with a different root directory.

Or from the CLI: `cd projects/<name>` and run `npx vercel --prod`.

## Credits

The lily bouquet renderer comes from [arimecoa/GIVEAWAY-ASCII](https://github.com/arimecoa/GIVEAWAY-ASCII)
(copied at commit `ca95f39`). That repo has no license file.
