import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const svg = readFileSync(join(root, 'public/brand/logo.svg'))

const icons = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
]

for (const { name, size } of icons) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(root, 'public', name))
  console.log('wrote', name)
}

// Multi-size .ico for app/favicon.ico (32px is the commonly used size)
await sharp(svg, { density: 384 })
  .resize(32, 32)
  .toFormat('png')
  .toFile(join(root, 'app/favicon.ico'))
console.log('wrote app/favicon.ico')

// Open Graph / share image (1200x630) — logo badge centered on a brand-gradient canvas with title text
const ogWidth = 1200
const ogHeight = 630
const badgeSize = 280

const badge = await sharp(svg, { density: 384 }).resize(badgeSize, badgeSize).png().toBuffer()

const ogBackground = Buffer.from(`
  <svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#312e81"/>
        <stop offset="0.5" stop-color="#4f46e5"/>
        <stop offset="1" stop-color="#7c3aed"/>
      </linearGradient>
    </defs>
    <rect width="${ogWidth}" height="${ogHeight}" fill="url(#bg)"/>
    <text x="600" y="460" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#ffffff" text-anchor="middle">AI Learning</text>
    <text x="600" y="510" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#ddd6fe" text-anchor="middle">Learn AI through play — ages 6 to 20</text>
  </svg>
`)

await sharp(ogBackground)
  .composite([{ input: badge, top: 90, left: (ogWidth - badgeSize) / 2 }])
  .png()
  .toFile(join(root, 'public/og-image.png'))
console.log('wrote public/og-image.png')
