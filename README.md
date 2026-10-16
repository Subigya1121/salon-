# LUXE & FADE: Premium Unisex Salon & Barbershop Website (demo template)

A client-ready demo site for a unisex barbershop and salon. All business details live in **`src/data/config.ts`**, so you can rebrand it for a real client without touching components. The demo business (LUXE & FADE, Kathmandu) is fictional.

## 1. Features
Responsive site, 12 routes (incl. custom 404), filterable services, team profiles, accessible gallery lightbox, 4-step booking with live slot availability, contact form, mobile Call/Directions/Book bar, SEO tags + LocalBusiness schema, analytics events, Supabase schema with RLS.

## 2. Tech stack
React 18, Vite, TypeScript, Tailwind CSS 3, React Router, React Hook Form + Zod, Supabase, Vercel (+ Vercel Analytics). shadcn/ui is not used; the UI is plain Tailwind components.

## 3. Folder structure
`src/components` (ui, layout, navigation, services, team, booking, gallery, reviews, contact, location), `src/pages`, `src/services`, `src/lib`, `src/hooks`, `src/data`, `src/types`, `supabase/schema.sql`.

## 4. Install & run
```bash
npm install
cp .env.example .env     # then fill in values
npm run dev
npm run build && npm run lint
npm run preview
```

## 5. Environment variables
| Variable | Purpose |
|---|---|
| VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY | Supabase project (anon key only, never the service-role key) |
| VITE_GOOGLE_MAPS_URL | "Get Directions" link |
| VITE_GOOGLE_MAPS_EMBED_URL | Google Maps embed `src` |
| VITE_SITE_URL | Used for canonical and Open Graph URLs |
| VITE_CLOUDINARY_CLOUD_NAME, VITE_ANALYTICS_ID | Optional, reserved for images/analytics |

## 6. Supabase setup (booking, contact, RLS)
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy the project URL and **anon** key into `.env`.
4. For the admin dashboard (not built), create a user in Auth and insert their id into `admins`.

Bookings and slot checks go through the `create_appointment` and `get_booked_slots` functions, so customer data is never publicly readable. A slot can't be double-booked (unique index). Without Supabase keys, the site runs in **demo mode**: bookings are simulated and clearly labelled "not saved".

## 7. Turning the demo into a real client site
1. Edit `src/data/config.ts`: name, phone, email, address, hours, services, prices, staff, social links, slots.
2. Set `BUSINESS.demo = false` (removes the banner and demo-mode bookings).
3. Add real photos: put files in `public/` or Cloudinary and set `src` on `GALLERY` entries and `photo` on `TEAM` entries.
4. Add real reviews only to `REVIEWS`.
5. Update `public/sitemap.xml` and `public/robots.txt` with the real domain.
6. Replace the template text in the Privacy and Terms pages with reviewed legal text.

## 8. Deploy to Vercel
Push to GitHub, import the repo in Vercel, add the env vars, deploy, then connect the domain. `vercel.json` handles SPA routing. Then test booking, mobile, forms and all links.

## 9. Security notes
Only the public anon key is used in the browser. Row Level Security is on for every table. Forms are validated with Zod in the browser, and the database functions validate again. A honeypot field catches simple bots. **Rate limiting is not included**: add it with Vercel/Cloudflare rules or a Supabase Edge Function before launch.

## 10. Troubleshooting
Blank booking times: check Supabase keys and that the SQL ran. "Something went wrong" on booking: check the function grants and the browser network tab.
