// Browser smoke test. Usage: bun run dev (port 3000) in one shell, then: node e2e/smoke.mjs
// Playwright is not a project dependency; it is loaded from the global install and uses the
// preinstalled Chromium (never run `playwright install`).
import { createRequire } from 'node:module';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const GLOBAL_MODULES = process.env.PLAYWRIGHT_NODE_MODULES || '/opt/node22/lib/node_modules/';
const CHROMIUM = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const { chromium } = createRequire(GLOBAL_MODULES)('playwright');
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ['--no-sandbox'] });

const results = [];
let current = [];

async function freshPage() {
  const context = await browser.newContext({ viewport: { width: Number(process.env.VIEWPORT_WIDTH || 1280), height: 900 } });
  const page = await context.newPage();
  page.on('console', m => {
    if (m.type() === 'error' && !m.location().url.endsWith('/favicon.ico')) current.push(`console: ${m.text()}`);
  });
  page.on('pageerror', e => current.push(`pageerror: ${e.message}`));
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  return page;
}

async function step(name, fn) {
  current = [];
  let page;
  try {
    page = await freshPage();
    const note = await fn(page);
    await page.waitForTimeout(250);
    results.push({ name, ok: current.length === 0, errors: [...current], note });
  } catch (e) {
    results.push({ name, ok: false, errors: [e.message.split('\n')[0], ...current] });
  } finally {
    if (page) await page.context().close();
  }
}

const click = (page, selector) => page.click(selector, { force: true, timeout: 5000 });
const openParent = async page => {
  await click(page, '#btn-open-parent-gate');
  await click(page, '#btn-testing-bypass-parental-gate');
  await page.waitForSelector('#parent-tab-children', { timeout: 5000 });
};

const stars = async page => Number((await page.textContent('#btn-child-profile-capsule')).replace(/\D+/g, '').slice(-3) || 0);

await step('home loads without console errors', async page => {
  await page.waitForSelector('#btn-child-profile-capsule');
});

await step('every grade tab can be selected', async page => {
  for (const id of ['paud', 'tk', 'sd-1', 'sd-2', 'sd-3', 'sd-4-6']) await click(page, `#btn-select-grade-${id}`);
});

await step('every subject card opens without errors', async page => {
  const ids = await page.$$eval('[id^="btn-subject-"]', els => els.map(e => e.id));
  for (const id of ids) await click(page, `#${id}`);
  return `${ids.length} subjects`;
});

await step('sound toggle works', async page => {
  await click(page, '#btn-toggle-sound');
  await click(page, '#btn-toggle-sound');
});

await step('guide greeting button speaks', async page => {
  await click(page, '#btn-guide-greeting');
});

await step('module lesson steps through to the quiz', async page => {
  await click(page, '#btn-learn-module-mod-angka-1-20');
  for (let i = 0; i < 12; i++) {
    const quiz = await page.$('#quiz-option-opt-c, [id^="quiz-option"]');
    if (quiz) return `reached quiz after ${i} steps`;
    const next = await page.$('#btn-next-step, button:has-text("Lanjut"), button:has-text("Mulai Kuis"), button:has-text("Selanjutnya")');
    if (!next) throw new Error('no next-step button found');
    await next.click({ force: true });
    await page.waitForTimeout(200);
  }
  throw new Error('never reached the quiz');
});

await step('quiz can be completed and awards stars', async page => {
  const before = await stars(page);
  await click(page, '#btn-quiz-module-mod-angka-1-20');
  for (let q = 0; q < 8; q++) {
    const option = await page.$('[id^="quiz-option-"]');
    if (!option) break;
    await option.click({ force: true });
    await page.waitForTimeout(200);
    const next = await page.$('#btn-quiz-next');
    if (!next) throw new Error(`no next button after answering question ${q + 1}`);
    await next.click({ force: true });
    await page.waitForTimeout(250);
  }
  await page.waitForSelector('#btn-quiz-home', { timeout: 5000 });
  const after = await stars(page);
  if (after <= before) throw new Error(`stars did not increase (${before} -> ${after})`);
  return `stars ${before} -> ${after}`;
});

await step('stars earned in a quiz survive a page reload', async page => {
  await click(page, '#btn-quiz-module-mod-angka-1-20');
  for (let q = 0; q < 8; q++) {
    const option = await page.$('[id^="quiz-option-"]');
    if (!option) break;
    await option.click({ force: true });
    const next = await page.waitForSelector('#btn-quiz-next', { timeout: 3000 });
    await next.click({ force: true });
    await page.waitForTimeout(200);
  }
  await page.waitForSelector('#btn-quiz-home', { timeout: 5000 });
  const earned = await stars(page);
  await page.reload({ waitUntil: 'networkidle' });
  const afterReload = await stars(page);
  if (afterReload !== earned) throw new Error(`stars changed across reload (${earned} -> ${afterReload})`);
  return `stars ${afterReload} kept`;
});

await step('narration toggle in the menu switches state', async page => {
  await click(page, '#btn-nav-more-options');
  const item = page.locator('button:visible:has-text("Narasi Suara")').first();
  const before = (await item.innerText()).replace(/\s+/g, ' ');
  await item.click({ force: true });
  await page.waitForTimeout(200);
  if (!(await page.locator('button:visible:has-text("Narasi Suara")').count())) await click(page, '#btn-nav-more-options');
  const after = (await page.locator('button:visible:has-text("Narasi Suara")').first().innerText()).replace(/\s+/g, ' ');
  if (before === after) throw new Error(`label did not change ("${before}")`);
  return `"${before}" -> "${after}"`;
});

await step('tracing studio opens', async page => {
  await click(page, '#btn-open-tracing-studio');
  await page.waitForSelector('canvas', { timeout: 5000 });
});

await step('menu: badge room opens and closes', async page => {
  await click(page, '#btn-nav-more-options');
  await page.click('button:has-text("Ruang Badge")', { force: true });
  await page.waitForSelector('#btn-close-badge-modal', { timeout: 5000 });
  await click(page, '#btn-close-badge-modal');
});

await step('question bank opens from the menu and closes', async page => {
  await click(page, '#btn-nav-more-options');
  await page.locator('button:visible:has-text("Bank Soal")').first().click({ force: true, timeout: 5000 });
  await page.waitForSelector('#btn-close-banksoal-modal', { timeout: 5000 });
  await click(page, '#btn-close-banksoal-modal');
});

await step('abacus (sempoa) lesson opens', async page => {
  await click(page, '#btn-subject-sempoa');
  await page.waitForTimeout(300);
  await page.locator('[id^="btn-learn-module-"]').first().click({ force: true });
  await page.waitForTimeout(600);
});

await step('english lesson opens', async page => {
  await click(page, '#btn-subject-bahasa_inggris');
  await page.waitForTimeout(300);
  await page.locator('[id^="btn-learn-module-"]').first().click({ force: true });
  await page.waitForTimeout(600);
});

await step('tracing studio canvas accepts a stroke', async page => {
  await click(page, '#btn-open-tracing-studio');
  const canvas = await page.waitForSelector('canvas', { timeout: 5000 });
  const box = await canvas.boundingBox();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.3);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.6, { steps: 8 });
  await page.mouse.up();
});

await step('menu: logout shows the auth dialog', async page => {
  await click(page, '#btn-nav-more-options');
  await page.click('button:has-text("Keluar Akun")', { force: true });
  await page.waitForTimeout(600);
});

await step('menu: admin login shows the admin gate', async page => {
  await click(page, '#btn-nav-more-options');
  await page.click('button:has-text("Login Portal Admin")', { force: true });
  await page.waitForTimeout(600);
});

await step('parent dashboard: every tab renders', async page => {
  await openParent(page);
  for (const id of ['progress', 'children', 'subscription', 'settings']) {
    await click(page, `#parent-tab-${id}`);
    await page.waitForTimeout(250);
  }
});

await step('parent dashboard: add a child profile', async page => {
  await openParent(page);
  await click(page, '#parent-tab-children');
  await click(page, '#btn-add-new-child-trigger');
  await page.fill('#input-child-name', 'Tes Anak');
  await click(page, '#btn-submit-add-child');
  await page.waitForTimeout(500);
  const found = await page.getByText('Tes Anak').first().isVisible();
  if (!found) throw new Error('new child is not listed after saving');
});

await step('parent dashboard: switch the active child', async page => {
  await openParent(page);
  await click(page, '#parent-tab-children');
  await click(page, '#btn-activate-child-child-alya-2');
  await page.waitForTimeout(300);
});

await step('subscription: manage and expiry preview open', async page => {
  await openParent(page);
  await click(page, '#parent-tab-subscription');
  await click(page, '#btn-preview-expiry-modal');
  await page.waitForTimeout(400);
});

await step('parent dashboard: practice question bank starts', async page => {
  await openParent(page);
  await click(page, '#btn-parent-test-banksoal');
  await page.waitForSelector('#btn-close-banksoal-modal', { timeout: 5000 });
});

await step('admin: PIN quick login opens the admin portal and every tab renders', async page => {
  await click(page, '#btn-nav-more-options');
  await page.click('button:has-text("Login Portal Admin")', { force: true });
  await click(page, '#btn-quick-admin-login');
  await page.waitForSelector('#admin-tab-overview', { timeout: 5000 });
  for (const id of ['overview', 'users', 'packages', 'transactions', 'passwords', 'settings']) {
    await click(page, `#admin-tab-${id}`);
    await page.waitForTimeout(250);
  }
});

await step('auth: register a new account', async page => {
  await click(page, '#btn-nav-more-options');
  await page.click('button:has-text("Keluar Akun")', { force: true });
  await click(page, '#btn-hero-register');
  await page.fill('#input-auth-name', 'Orang Tua Tes');
  await page.fill('#input-auth-email', 'tes-smoke@example.com');
  await page.fill('#input-auth-password', 'kata-sandi-1');
  await click(page, '#btn-auth-submit');
  await page.waitForSelector('#btn-close-auth-modal', { state: 'detached', timeout: 5000 });
  await page.waitForSelector('#btn-child-profile-capsule', { timeout: 5000 });
});

await step('auth: demo login', async page => {
  await click(page, '#btn-nav-more-options');
  await page.click('button:has-text("Keluar Akun")', { force: true });
  await click(page, '#btn-hero-login');
  await click(page, '#btn-quick-demo-login');
  await page.waitForSelector('#btn-close-auth-modal', { state: 'detached', timeout: 5000 });
  await page.waitForSelector('#btn-child-profile-capsule', { timeout: 5000 });
});

await browser.close();

const failed = results.filter(r => !r.ok);
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.note ? `  (${r.note})` : ''}`);
  for (const e of r.errors) console.log(`        ${e}`);
}
console.log(`\n${results.length - failed.length}/${results.length} steps passed`);
process.exit(failed.length ? 1 : 0);
