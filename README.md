# ascii art

Little animated web pages made entirely of letters and symbols. Each one is a single `index.html` with no
build step. You open it, and something starts moving.

## what's in here

- **[maddy-lilies](projects/maddy-lilies)**: a greeting that dissolves into a bouquet of lilies. 🌷
- **[kebabbo](projects/kebabbo)**: a döner kebab turning on its skewer forever, under a neon sign. 🥙
- **[ricordi](projects/ricordi)**: five photos redrawn with letters, each with its own little animation. 📸
- **[famiglia](projects/famiglia)**: the people and animals at home, drawn the same way. 🏡

The `sources/` folder holds the original pages I started from. I kept them so I can borrow from them later.

## making another one

Make a new folder in `projects/`, put an `index.html` in it, and open it in a browser to see how it looks.
Copying an existing project is the quickest way to start.

## putting it online

I host these on Vercel. Import this repo as a new project, set **Root Directory** to the project's folder
(for example `projects/kebabbo`), choose **Other** as the framework, and deploy. Every project gets its own
Vercel project and its own link, all from this one repo.
