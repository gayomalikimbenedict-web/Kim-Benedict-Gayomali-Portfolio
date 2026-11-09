# Kim Benedict Gayomali, portfolio

The portfolio of Kim Benedict Gayomali (Sechurplets Studio): a React and TypeScript site with a left sidebar, an animated network background and walkthroughs of real builds. Written from scratch; no template code.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3000. Build for production with `npm run build` (type-checks first, then builds into `dist/`). Node 20.19 or newer.

## Where things live

- `src/data/content.ts`: every word on the site, as typed data. Edit text here, not in components.
- `src/components/`: one file and one stylesheet per section (Sidebar, Hero, Services, Work, Approach, About, Contact) plus the background layers.
- `src/hooks/`: scroll progress, active menu item, fade-in on scroll, and the contact form.
- `src/styles/tokens.css`: colors, sizes and the font. Change the look here first.
- `public/`: images, resume PDF, favicon, share image and the two walkthrough pages in `public/projects/`.

## Contact form

Without configuration the form opens the visitor's email app with the message filled in. To post it to a form service instead, copy `.env.example` to `.env`, set `VITE_CONTACT_ENDPOINT` to a URL that accepts a JSON POST, and set the same variable in your Vercel project settings.

## Deploy (Vercel)

Vercel detects Vite automatically: build command `npm run build`, output folder `dist`. Pushing a branch other than the production branch creates a preview link and leaves the live site alone.

## Accessibility and motion

Keyboard navigation, a skip link and visible focus rings are built in. The animated background, floating labels and scroll fade-ins switch off for visitors who prefer reduced motion.
