const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Crisp Favicon Specific SVG (Ultra-high contrast, large shield & glowing lock, zero micro-text)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>

    <linearGradient id="shieldGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>

    <linearGradient id="shieldGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>

    <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- High-contrast rounded background -->
  <rect x="4" y="4" width="120" height="120" rx="28" fill="url(#bgGrad)" />
  <rect x="4" y="4" width="120" height="120" rx="28" fill="none" stroke="url(#ringGrad)" stroke-width="4.5" />

  <!-- Shield Shape (Enlarged for Favicon tab visibility) -->
  <g transform="translate(0, 2)">
    <!-- Left Shield Wing -->
    <path d="M 64 18 L 22 34 C 22 80 64 106 64 112 Z" fill="url(#shieldGradLeft)" />
    <!-- Right Shield Wing -->
    <path d="M 64 18 L 106 34 C 106 80 64 106 64 112 Z" fill="url(#shieldGradRight)" />
    <!-- Center Spine line -->
    <path d="M 64 18 L 64 112" stroke="#ffffff" stroke-width="1.8" opacity="0.8" />

    <!-- Dark Inner Core Shield -->
    <path d="M 64 32 L 34 44 C 34 76 64 94 64 98 C 64 94 94 76 94 44 Z" fill="#090d16" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />

    <!-- Bold Security Centerpiece (Lock) -->
    <!-- Lock Shackle -->
    <path d="M 54 58 L 54 48 C 54 41 58 37 64 37 C 70 37 74 41 74 48 L 74 58" fill="none" stroke="url(#lockGrad)" stroke-width="5" stroke-linecap="round" />
    <!-- Lock Body -->
    <rect x="47" y="56" width="34" height="26" rx="6" fill="url(#lockGrad)" filter="url(#glow)" />
    <!-- Keyhole -->
    <circle cx="64" cy="67" r="3.2" fill="#090d16" />
    <path d="M 62 67 L 66 67 L 67 76 L 61 76 Z" fill="#090d16" />
  </g>
</svg>`;

// 2. High-res App Logo (512x512)
const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="40%" stop-color="#2563eb" />
      <stop offset="80%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>

    <linearGradient id="shieldLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>

    <linearGradient id="shieldRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="50%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>

    <linearGradient id="shieldCore" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <linearGradient id="lockGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)" />
  <rect x="16" y="16" width="480" height="480" rx="108" fill="none" stroke="url(#borderGrad)" stroke-width="8" opacity="0.9" />

  <circle cx="256" cy="240" r="140" fill="#2563eb" opacity="0.25" filter="url(#glow)" />
  <circle cx="256" cy="270" r="100" fill="#10b981" opacity="0.22" filter="url(#glow)" />

  <g transform="translate(0, 10)">
    <path d="M 256 70 L 380 116 C 380 260 256 364 256 390 C 256 364 132 260 132 116 Z" 
          fill="#1e293b" opacity="0.4" transform="translate(0, 10)" />

    <path d="M 256 64 L 136 112 C 136 260 256 364 256 390 Z" 
          fill="url(#shieldLeft)" />

    <path d="M 256 64 L 376 112 C 376 260 256 364 256 390 Z" 
          fill="url(#shieldRight)" />

    <path d="M 256 64 L 256 390" stroke="#ffffff" stroke-width="3.5" opacity="0.75" />

    <path d="M 256 110 L 340 144 C 340 248 256 324 256 346 C 256 324 172 248 172 144 Z" 
          fill="url(#shieldCore)" stroke="rgba(255,255,255,0.15)" stroke-width="2.5" />

    <path d="M 216 185 L 296 185" stroke="#38bdf8" stroke-width="2" opacity="0.4" />
    <path d="M 226 220 L 286 220" stroke="#34d399" stroke-width="2" opacity="0.4" />

    <path d="M 234 212 L 234 188 C 234 174 244 162 256 162 C 268 162 278 174 278 188 L 278 212" 
          fill="none" stroke="url(#lockGold)" stroke-width="10" stroke-linecap="round" />
    <rect x="216" y="210" width="80" height="66" rx="16" fill="url(#lockGold)" filter="url(#glow)" />
    <circle cx="256" cy="238" r="7" fill="#0f172a" />
    <path d="M 253 238 L 259 238 L 261 256 L 251 256 Z" fill="#0f172a" />
  </g>
</svg>`;

async function run() {
  const publicDir = path.join(__dirname, '../public');
  const appDir = path.join(__dirname, '../src/app');

  // 1. Generate Favicon Buffer (64x64 PNG and ICO format)
  const faviconBuffer64 = await sharp(Buffer.from(faviconSvg))
    .resize(64, 64)
    .png()
    .toBuffer();

  const faviconBuffer32 = await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toBuffer();

  // OVERWRITE BOTH public/favicon.ico and src/app/favicon.ico
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconBuffer64);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), faviconBuffer64);
  console.log('✅ Updated public/favicon.ico & src/app/favicon.ico');

  // Also create src/app/icon.png and src/app/apple-icon.png for Next.js App Router native detection
  fs.writeFileSync(path.join(appDir, 'icon.png'), faviconBuffer32);
  console.log('✅ Created src/app/icon.png (32x32)');

  // 2. High-res SVGs
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), appIconSvg, 'utf8');
  console.log('✅ Saved public/icon.svg');

  // 3. 512x512 PNG
  await sharp(Buffer.from(appIconSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✅ Generated public/icon-512.png (512x512)');

  // 4. 192x192 PNG
  await sharp(Buffer.from(appIconSvg))
    .resize(192, 192)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✅ Generated public/icon-192.png (192x192)');

  // 5. Apple Touch Icon (180x180) in public and src/app
  const appleTouchBuffer = await sharp(Buffer.from(appIconSvg))
    .resize(180, 180)
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchBuffer);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleTouchBuffer);
  console.log('✅ Updated public/apple-touch-icon.png & src/app/apple-icon.png (180x180)');
}

run().catch(console.error);

