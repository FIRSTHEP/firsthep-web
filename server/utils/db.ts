import Database from 'better-sqlite3'
import { resolve, dirname } from 'path'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname2 = process.env.DATABASE_PATH
  ? dirname(process.env.DATABASE_PATH)
  : resolve(process.cwd(), 'data')

const dbPath = process.env.DATABASE_PATH || resolve(process.cwd(), 'data/blog.db')
let db: ReturnType<typeof Database> | null = null

export function getDb() {
  if (!db) {
    mkdirSync(dirname(dbPath), { recursive: true })
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        category TEXT DEFAULT '',
        image TEXT DEFAULT '',
        youtube TEXT DEFAULT '',
        tags TEXT DEFAULT '[]',
        content TEXT DEFAULT '',
        published INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `)
    const count = db.prepare('SELECT COUNT(*) as c FROM posts').get() as any
    if (count.c === 0) {
      const seed = db.prepare(`INSERT INTO posts (slug, title, description, category, image, youtube, tags, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      seed.run('mini-itx-2026-build', 'ประกอบคอม Mini ITX 2026 งบ 1.4 แสน', 'รีวิวการประกอบคอม Mini ITX สเปกแรงในเคสจิ๋ว Fractal Design Terra', 'PC Build', 'https://i.ytimg.com/vi/BOWzkzQHpqk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=BOWzkzQHpqk', '["pc-build","mini-itx"]', '<h2>Monster Mini ITX</h2><p>สเปกจัดเต็มยัดลงเคสจิ๋ว!</p><ul><li>CPU: Ryzen 7 9800X3D</li><li>GPU: RTX 5080 SFF</li><li>Case: Fractal Design Terra</li></ul><p><strong>Total: 139,526 THB</strong></p>')
      seed.run('anker-liberty-5-pro', 'รีวิว ANKER soundcore Liberty 5 Pro', 'หูฟัง True Wireless เสียงดี ANC4 ฟังก์ชั่นจัดเต็ม', 'Audio', 'https://i.ytimg.com/vi/Zd4n-qKkqoI/maxresdefault.jpg', 'https://www.youtube.com/watch?v=Zd4n-qKkqoI', '["audio","anker"]', '<h2>ANKER soundcore Liberty 5 Pro</h2><p>หูฟังเรือธง ANC4.0 เสียงดี ตัดเสียงเทพ</p><ul><li>ANC 4.0</li><li>Battery 10 ชม.</li><li>LDAC Hi-Res</li></ul>')
      seed.run('ergonoz-integra-desk', 'จัดโต๊ะคอม L-Shape เล่น Mario Kart', 'รีวิวโต๊ะปรับระดับ Ergonoz Integra L-Shape', 'Desk Setup', 'https://i.ytimg.com/vi/1kulJLWp3WQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=1kulJLWp3WQ', '["desk-setup","ergonoz"]', '<h2>Ergonoz Integra L-Shape</h2><p>โต๊ะปรับระดับทรงแอลสีขาว เข้ามุมห้องดีมาก!</p><ul><li>มอเตอร์เงียบ นิ่ง</li><li>รับน้ำหนักเยอะ</li><li>สีขาว minimal</li></ul>')
    }
  }
  return db
}
