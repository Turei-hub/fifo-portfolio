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
2. **Settings → Environment Variables**, add the three from `.env.example` for the contact form (sent through Brevo's free plan):
   - `BREVO_API_KEY` (Brevo → SMTP & API → API Keys)
   - `CONTACT_TO` (where messages land)
   - `CONTACT_FROM` (an address on a Brevo-authenticated domain, e.g. `portfolio@kaupekadigital.com`)
3. Redeploy. Every push to `main` deploys automatically.

## Admin portal (tureimilner.com/admin)

Add, edit or delete tickets and licences (with dates, expiry and a photo). The Certificates page reads them live.

Setup in Vercel (one time):
1. **Storage → Create → Neon** (Postgres), connect it to this project. Adds `DATABASE_URL`. The `tickets` table creates and seeds itself.
2. **Storage → Create → Blob**, connect it to this project. Adds `BLOB_READ_WRITE_TOKEN` for photos.
3. **Environment Variables → Secret** `ADMIN_PASSWORD` (12+ characters). Changing it logs out every session.
4. Redeploy.

## Custom domain

Vercel → Project → **Settings → Domains** → add the domain, then set the DNS records Vercel shows at your registrar.
