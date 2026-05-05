import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { mkdirSync, rmSync, writeFileSync } from 'fs';

const frames = 24;
const dur = 4.5;
const dir = '/tmp/hourglass-frames';

const html = `
<!DOCTYPE html>
<html><body style="margin:0;background:#1a1a1a;display:flex;align-items:center;justify-content:center;height:100vh">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300">
  <defs>
    <style>
      @keyframes hg-flip { 0%,80%{transform:rotate(0deg)} 92%,100%{transform:rotate(180deg)} }
      @keyframes hg-top { 0%,10%{transform:scaleY(1)} 80%,100%{transform:scaleY(0)} }
      @keyframes hg-bot { 0%,10%{transform:scaleY(0)} 80%,100%{transform:scaleY(1)} }
      @keyframes hg-str { 0%,10%{stroke-dashoffset:28} 15%,75%{stroke-dashoffset:0} 80%,100%{stroke-dashoffset:-28} }
      .g { transform-origin:50px 50px; animation:hg-flip ${dur}s cubic-bezier(0.45,0,0.55,1) infinite }
      .t { transform-origin:50px 50px; animation:hg-top ${dur}s linear infinite }
      .b { transform-origin:50px 80px; animation:hg-bot ${dur}s linear infinite }
      .s { stroke-dasharray:28; stroke-dashoffset:28; animation:hg-str ${dur}s linear infinite }
    </style>
    <clipPath id="c"><path d="M 32 20 C 32 45,46 48,50 50 C 54 48,68 45,68 20 Z M 32 80 C 32 55,46 52,50 50 C 54 52,68 55,68 80 Z"/></clipPath>
  </defs>
  <g class="g">
    <g clip-path="url(#c)">
      <rect class="t" x="25" y="20" width="50" height="30" fill="#FF8C42"/>
      <rect class="b" x="25" y="50" width="50" height="30" fill="#FF8C42"/>
    </g>
    <line class="s" x1="50" y1="50" x2="50" y2="78" stroke="#FF8C42" stroke-width="2.5"/>
    <path d="M 32 20 C 32 45,46 48,50 50 C 54 48,68 45,68 20 M 32 80 C 32 55,46 52,50 50 C 54 52,68 55,68 80" fill="none" stroke="#9BA4B5" stroke-width="3" stroke-linecap="round"/>
    <line x1="22" y1="20" x2="22" y2="80" stroke="#2B2D42" stroke-width="5" stroke-linecap="round"/>
    <line x1="78" y1="20" x2="78" y2="80" stroke="#2B2D42" stroke-width="5" stroke-linecap="round"/>
    <line x1="44" y1="50" x2="56" y2="50" stroke="#2B2D42" stroke-width="6" stroke-linecap="round"/>
    <line x1="14" y1="20" x2="86" y2="20" stroke="#2B2D42" stroke-width="8" stroke-linecap="round"/>
    <line x1="14" y1="80" x2="86" y2="80" stroke="#2B2D42" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>
</body></html>
`;

writeFileSync('/tmp/hourglass.html', html);
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 400, height: 400 } });
await page.goto('file:///tmp/hourglass.html');

await page.evaluate(() => {
  const g = document.querySelector('.g');
  g.style.animationPlayState = 'paused';
  window.__g = g;
});

for (let i = 0; i < frames; i++) {
  const delay = -((i / frames) * dur);
  await page.evaluate((d) => {
    window.__g.style.animationDelay = `${d}s`;
  }, delay);
  await new Promise(r => setTimeout(r, 50));
  await page.screenshot({ path: `${dir}/frame${String(i).padStart(3, '0')}.png` });
}

await browser.close();

execSync(
  `ffmpeg -y -framerate 10 -i ${dir}/frame%03d.png -filter_complex "[0:v]crop=275:275:62:62,split[s0][s1];[s0]palettegen=stats_mode=single[p];[s1][p]paletteuse=new=1" -loop 0 docs/hourglass-loader.gif`,
  { stdio: 'inherit' }
);
rmSync(dir, { recursive: true, force: true });
console.log('GIF created: docs/hourglass-loader.gif');
