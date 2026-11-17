# ascii art 🌷

Little animated web pages made entirely of letters and symbols. I make them when I want to send someone
flowers but a real bouquet won't fit through the phone.

Each one is a single `index.html` with no build step. You open it, wait a few seconds, and something grows.

## what's in here

**[maddy-lilies](projects/maddy-lilies)**: a message writes itself on screen in pink handwriting, breaks
up into tiny golden sparks, and a bouquet of lilies grows where it was. The flowers keep swaying after
that, so you can leave it open as long as you like.

The `sources/` folder holds the original pages I started from. I kept them so I can borrow from them next time.

## making another one

Copy `projects/maddy-lilies` to a new folder, change the words (and the colours, if you're feeling brave),
and open `index.html` in a browser to see how it looks.

## putting it online

I host these on Vercel. Import this repo as a new project, set **Root Directory** to the gift's folder
(for example `projects/maddy-lilies`), choose **Other** as the framework, and deploy. Every gift gets its
own Vercel project and its own link, all from this one repo.

## credit where it's due

The lily bouquet animation isn't mine. It comes from
[arimecoa/GIVEAWAY-ASCII](https://github.com/arimecoa/GIVEAWAY-ASCII) (copied at commit `ca95f39`).
I only added the greeting at the start. That repo has no license file, so the credit for the flowers goes to them.
