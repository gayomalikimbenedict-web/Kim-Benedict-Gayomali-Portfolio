# Kim Benedict Gayomali, portfolio v2

Portfolio of Kim Benedict Gayomali (Sechurplets Studio). Built on the portfoliov2-template layout, with this site's own content, navy and cyan colors and the Manrope typeface.

## Run it

```
npm install
npm run dev
```

Open http://localhost:5190. Build for production with `npm run build` (it type-checks first). Node 20.19 or newer.

## Where things live

- All copy is in `src/content/`: `site.ts` (name, links, photo), `home.ts` (hero, manifesto, Work chapters), `services.ts`, `method.ts` (How I work), `about.ts`, `proof.ts`, `showcase.ts`, `faqs.ts`, `legal.ts`.
- Pictures and the Showcase film are in `public/images/` and `public/media/`. The two walkthrough pages are `public/projects/*.html`.
- Colors are tokens in `src/styles/tokens.css`. The font is set in `src/styles/index.css` and loaded from Google Fonts in `index.html`.
- `src/content/automation.ts` and `src/features/home/automation/` are left over from the template. The Home page no longer shows the automation diagram, so they are unused and can be deleted.

## Deploy

`vercel.json` sends every path to `index.html` so routes like `/work/walkthroughs` load on refresh. Files in `public/` are served first.

## License

Layout based on portfoliov2-template by BrewedOps, used under the PolyForm Noncommercial License 1.0.0 with its Additional Permission for your own portfolio. See `LICENSE`. Keep that file and its Required Notice line in the repository.
