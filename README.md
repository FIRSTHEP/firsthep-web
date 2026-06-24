# FIRSTHEP Website

Personal branding website + blog CMS for FIRSTHEP (Thai tech YouTuber).

## Quick Start

```bash
cp .env.example .env
npm install
npm run build
node .output/server/index.mjs
```

Open http://localhost:3000

## Admin

- Login: http://localhost:3000/admin
- Default password: `firsthep2026` (change via `ADMIN_PASS` env var)

## Features

- Landing page (hero, setup gallery, reviews, vlogs, brands, about, collab)
- Blog with rich text editor (TipTap)
- Image upload (hero + inline content images)
- Admin panel (CRUD posts, draft/publish)
- SQLite database (auto-created with seed data)
- Session-based auth (random token, 24h expiry)

## API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/posts | - | List published posts (pagination: ?limit=20&offset=0) |
| GET | /api/posts/:slug | - | Get single post |
| POST | /api/posts | Yes | Create post |
| PUT | /api/posts/:slug | Yes | Update post |
| DELETE | /api/posts/:slug | Yes | Delete post |
| POST | /api/upload | Yes | Upload image (max 5MB) |
| POST | /api/auth/login | - | Login (returns session token) |
| GET | /api/health | - | Health check |

## Tech Stack

- Nuxt 3 (SPA + server API)
- Tailwind CSS + Inter font
- TipTap (rich text editor)
- SQLite (better-sqlite3)
- Image upload to `public/uploads/`

## Env Variables

| Variable | Default | Description |
|----------|---------|-------------|
| ADMIN_PASS | firsthep2026 | Admin login password |
| DATABASE_PATH | ./data/blog.db | SQLite database path |
| PORT | 3000 | Server port |
