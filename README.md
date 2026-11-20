# Turei Milner | FIFO / Mining Portfolio

Portfolio site for FIFO and mining job applications in Western Australia. Built with React, Vite and Tailwind CSS, deployed on Vercel.

**Pages:** Home · FIFO · Experience · Certificates · Tech Work · Contact

## Run it locally

```bash
npm install
npm run dev
```

## Update the content

All the text lives in [`src/data.js`](src/data.js). Anything set to `null` is hidden on the live site, so fill these in when you have them:

- `site.phone`, `site.roster`, `site.startDate`
- `site.cvUrl`: put the final CV PDF in `public/` (e.g. `public/Turei_Milner_CV.pdf`) and set `cvUrl: '/Turei_Milner_CV.pdf'`. Until then the button says "Request my CV".
- `jobs[].dates` and company names
- `projects[].url` for Te Pātaka, Phone Ninja and Bush to Browser

Images live in `public/img/`.

## Deploy on Vercel

1. vercel.com → **Add New → Project** → import `Turei-hub/fifo-portfolio`. Vercel detects Vite; keep the defaults.
2. **Settings → Environment Variables**, add the three from `.env.example` for the contact form:
   - `SENDGRID_API_KEY`
   - `CONTACT_TO` (where messages land)
   - `CONTACT_FROM` (a sender verified in SendGrid)
3. Redeploy. Every push to `main` deploys automatically.

## Custom domain

Vercel → Project → **Settings → Domains** → add the domain, then set the DNS records Vercel shows at your registrar.
