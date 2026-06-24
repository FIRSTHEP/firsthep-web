# FIRSTHEP Website

Personal branding website + blog CMS for FIRSTHEP (Thai tech YouTuber).

Live: https://firsthep.com

## Quick Start (Local)

```bash
git clone https://github.com/FIRSTHEP/firsthep-web.git
cd firsthep-web
cp .env.example .env
npm install
npm run build
node .output/server/index.mjs
```

Open http://localhost:3000

## Admin Panel

- URL: https://firsthep.com/admin
- Password: set via `ADMIN_PASS` env var

### Create/Edit Posts

1. Login at `/admin`
2. Click "New Post" or "Edit" on existing post
3. Fill title, category, description, hero image (upload or URL)
4. Write content with rich text editor (bold, headings, lists, images, links)
5. Toggle Published/Draft
6. Save

## Tech Stack

- **Frontend:** Nuxt 3.21 (SPA mode, compatibilityVersion 4)
- **Styling:** Tailwind CSS + Inter font
- **Editor:** TipTap (rich text, image upload)
- **Backend:** Nitro server API (built into Nuxt)
- **Database:** SQLite (better-sqlite3)
- **Auth:** Session token (random 32 bytes, 24h expiry)

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts` | No | List published posts (?limit=20&offset=0) |
| GET | `/api/posts/:slug` | No | Get single post |
| POST | `/api/posts` | Yes | Create post |
| PUT | `/api/posts/:slug` | Yes | Update post |
| DELETE | `/api/posts/:slug` | Yes | Delete post |
| POST | `/api/upload` | Yes | Upload image (max 5MB, jpg/png/gif/webp/svg) |
| POST | `/api/auth/login` | No | Login → returns session token |
| GET | `/api/health` | No | Health check (status, version, uptime) |

**Auth header:** `Authorization: Bearer <token>`

**Response format:** `{ data: ..., meta?: { total, limit, offset } }` or error `{ message: "..." }`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ADMIN_PASS` | firsthep2026 | Admin login password |
| `DATABASE_PATH` | ./data/blog.db | SQLite database file path |
| `PORT` | 3000 | Server port |

## Server Deployment (Lightsail)

**Host:** 52.77.208.221 (AWS Lightsail, ap-southeast-1)
**OS:** Ubuntu 24.04, Node 22
**Domain:** firsthep.com (Cloudflare DNS, Proxied, SSL Flexible)

### SSH Access

```bash
ssh -i ~/Downloads/LightsailDefaultKey-ap-southeast-1.pem ubuntu@52.77.208.221
```

### Service Management

```bash
# Status
sudo systemctl status firsthep

# Restart
sudo systemctl restart firsthep

# View logs
sudo journalctl -u firsthep -f

# Service file
cat /etc/systemd/system/firsthep.service
```

### Deploy Updates

```bash
ssh -i ~/Downloads/LightsailDefaultKey-ap-southeast-1.pem ubuntu@52.77.208.221 \
  'cd ~/firsthep-web && git pull && npm install && npx nuxt build && sudo systemctl restart firsthep'
```

### Change Admin Password

```bash
ssh -i ~/Downloads/LightsailDefaultKey-ap-southeast-1.pem ubuntu@52.77.208.221 \
  'sudo sed -i "s/ADMIN_PASS=.*/ADMIN_PASS=NewPassword/" /etc/systemd/system/firsthep.service && sudo systemctl daemon-reload && sudo systemctl restart firsthep'
```

### Port Setup

- App runs on port 3000
- iptables redirects port 80 → 3000
- Cloudflare handles HTTPS (SSL Flexible mode)

To re-apply iptables after reboot:
```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
```

## File Structure

```
firsthep-web/
  app/
    pages/
      index.vue          # Landing page (hero, stats, blog, setups, reviews, vlogs, brands, about, collab)
      blog/
        index.vue        # Blog list (card grid)
        [...slug].vue    # Blog detail (content + tags)
      admin/
        index.vue        # Login
        posts/
          index.vue      # Post list (edit/delete)
          [slug].vue     # Post editor (rich text + image upload)
    components/
      RichEditor.vue     # TipTap WYSIWYG editor
    app.vue              # Root (head, favicon)
  server/
    api/
      auth/login.post.ts # Login endpoint
      health.get.ts      # Health check
      posts/             # CRUD posts
      upload/            # Image upload
    utils/
      auth.ts            # Session token management
      db.ts              # SQLite setup + seed
  public/
    uploads/             # Uploaded images (gitignored)
    favicon.svg
  data/
    blog.db              # SQLite database (gitignored, auto-created)
  .env.example
  nuxt.config.ts
  tailwind.config.ts
  package.json
```

## Cloudflare Setup

1. DNS: A record `@` → `52.77.208.221` (Proxied)
2. SSL/TLS: **Flexible** (Cloudflare terminates HTTPS, connects to server via HTTP)
3. Lightsail firewall: port 80 open to all

## Data & Backups

- Database: `/home/ubuntu/firsthep-web/data/blog.db`
- Uploaded images: `/home/ubuntu/firsthep-web/public/uploads/`
- Backup: `scp -i key.pem ubuntu@52.77.208.221:~/firsthep-web/data/blog.db ./backup/`
