# ascii art

Little animated web pages made entirely of letters and symbols. Each one is a single `index.html` with no
build step. You open it, and something starts moving.

## what's in here

- **[maddy-lilies](projects/maddy-lilies)**: a greeting that dissolves into a bouquet of lilies. 🌷
- **[kebabbo](projects/kebabbo)**: a döner kebab turning on its skewer forever, under a neon sign. 🥙
- **[ricordi](projects/ricordi)**: five photos redrawn with letters, each with its own little animation. 📸
- **[famiglia](projects/famiglia)**: the people and animals at home, drawn the same way. 🏡
- **[esn](projects/esn)**: the ESN star, turning and throwing sparks. ⭐ It's also the first slide of my
  letter to ESN Bologna. The other slides each have their own piece, with no words in them:
  - [02-pioggia](projects/lettera/02-pioggia): rain sliding down a dark window.
  - [03-alba](projects/lettera/03-alba): the sun rising over the sea.
  - [04-sezione](projects/lettera/04-sezione): me and my first section on a metro, with the flag.
  - [05-bologna](projects/lettera/05-bologna): the march under the two towers, from ricordi.
  - [06-limoncello](projects/lettera/06-limoncello): a limoncello bottle dancing to a beat.
  - [07-faro](projects/lettera/07-faro): a lighthouse at night, its beam sweeping round.
  - [08-crime-night](projects/lettera/08-crime-night): a magnifying glass over a fingerprint, noir.
  - [09-cannone](projects/lettera/09-cannone): a circus cannon firing someone into a net.
  - [10-ragnatele](projects/lettera/10-ragnatele): dusty cobwebs and a spider on its thread.
  - [11-bacio](projects/lettera/11-bacio): the blown kiss, from ricordi.

The `sources/` folder holds the original pages I started from. I kept them so I can borrow from them later.

## making another one

Make a new folder in `projects/`, put an `index.html` in it, and open it in a browser to see how it looks.
Copying an existing project is the quickest way to start.

## putting it online

I host these on Vercel. Import this repo as a new project, set **Root Directory** to the project's folder
(for example `projects/kebabbo`), choose **Other** as the framework, and deploy. Every project gets its own
Vercel project and its own link, all from this one repo.
