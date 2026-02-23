const { test, expect } = require('@playwright/test');

// All pages to test
const pages = [
  { path: '/', name: 'index' },
  { path: '/modules/module-1-foundation.html', name: 'module-1' },
  { path: '/modules/module-2-followup-system.html', name: 'module-2' },
  { path: '/modules/module-3-reasons-to-call.html', name: 'module-3' },
  { path: '/modules/module-4-objections.html', name: 'module-4' },
  { path: '/modules/module-5-voicemail.html', name: 'module-5' },
  { path: '/modules/module-6-metrics.html', name: 'module-6' },
  { path: '/tools/calendar.html', name: 'calendar' },
  { path: '/tools/calculator.html', name: 'calculator' },
  { path: '/tools/tracker.html', name: 'tracker' },
  { path: '/tools/scripts-cards.html', name: 'scripts-cards' },
];

// ==========================================
// 1. All pages load without errors
// ==========================================
for (const pg of pages) {
  test(`${pg.name} loads without JS errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto(pg.path);
    expect(errors).toEqual([]);
  });
}

// ==========================================
// 2. No long dashes anywhere
// ==========================================
for (const pg of pages) {
  test(`${pg.name} has no long dashes`, async ({ page }) => {
    await page.goto(pg.path);
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('\u2014'); // em dash
    expect(bodyText).not.toContain('\u2013'); // en dash
  });
}

// ==========================================
// 3. No [Dealership] placeholder
// ==========================================
for (const pg of pages) {
  test(`${pg.name} has no [Dealership] placeholder`, async ({ page }) => {
    await page.goto(pg.path);
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('[Dealership]');
  });
}

// ==========================================
// 4. No emoji HTML entities in module-2
// ==========================================
test('module-2 has no emoji HTML entities', async ({ page }) => {
  await page.goto('/modules/module-2-followup-system.html');
  const html = await page.content();
  // These are the phone, speech bubble, mobile emoji codes
  expect(html).not.toContain('&#128222;');
  expect(html).not.toContain('&#128172;');
  expect(html).not.toContain('&#128241;');
});

// ==========================================
// 5. No mobile overflow at 375px
// ==========================================
for (const pg of pages) {
  test(`${pg.name} no horizontal overflow at 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(pg.path);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });
}

// ==========================================
// 6. cursor-pointer on clickable elements
// ==========================================
test('calendar touchpoint cards have cursor-pointer', async ({ page }) => {
  await page.goto('/tools/calendar.html');
  const cards = page.locator('.touchpoint-card[onclick]');
  const count = await cards.count();
  expect(count).toBe(6);
  for (let i = 0; i < count; i++) {
    const cls = await cards.nth(i).getAttribute('class');
    expect(cls).toContain('cursor-pointer');
  }
});

test('calendar channel-tab buttons have cursor-pointer', async ({ page }) => {
  await page.goto('/tools/calendar.html');
  const tabs = page.locator('.channel-tab');
  const count = await tabs.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const cls = await tabs.nth(i).getAttribute('class');
    expect(cls).toContain('cursor-pointer');
  }
});

// ==========================================
// 7. Calendar: 36 scripts total
// ==========================================
test('calendar has exactly 36 scripts', async ({ page }) => {
  await page.goto('/tools/calendar.html');
  const scripts = page.locator('.script-item');
  await expect(scripts).toHaveCount(36);
});

// ==========================================
// 8. Calendar: 6 day detail panels
// ==========================================
test('calendar has 6 day detail panels', async ({ page }) => {
  await page.goto('/tools/calendar.html');
  const panels = page.locator('.day-detail');
  await expect(panels).toHaveCount(6);
});

// ==========================================
// 9. Calendar: channel filter tabs work
// ==========================================
test('calendar channel filter hides/shows scripts', async ({ page }) => {
  await page.goto('/tools/calendar.html');
  // Open Day 1
  await page.click('.touchpoint-card[onclick="showDayDetail(1)"]');
  const panel = page.locator('#day-1');
  await expect(panel).toBeVisible();

  // Click CALL tab
  await panel.locator('.channel-tab[data-channel="call"]').click();
  // Call scripts should be visible
  const callScripts = panel.locator('.script-item[data-type="call"]');
  const callCount = await callScripts.count();
  expect(callCount).toBe(3);
  for (let i = 0; i < callCount; i++) {
    await expect(callScripts.nth(i)).toBeVisible();
  }
  // Text scripts should be hidden
  const textScripts = panel.locator('.script-item[data-type="text"]');
  const textCount = await textScripts.count();
  for (let i = 0; i < textCount; i++) {
    await expect(textScripts.nth(i)).toBeHidden();
  }

  // Click ALL tab - everything visible again
  await panel.locator('.channel-tab[data-channel="all"]').click();
  const allScripts = panel.locator('.script-item');
  const allCount = await allScripts.count();
  expect(allCount).toBe(9);
  for (let i = 0; i < allCount; i++) {
    await expect(allScripts.nth(i)).toBeVisible();
  }
});

// ==========================================
// 10. Calendar: Day 1 script counts by channel
// ==========================================
test('calendar Day 1 has correct script breakdown (3 call, 2 vm, 3 text, 1 email)', async ({ page }) => {
  await page.goto('/tools/calendar.html');
  const panel = page.locator('#day-1');
  await expect(panel.locator('.script-item[data-type="call"]')).toHaveCount(3);
  await expect(panel.locator('.script-item[data-type="vm"]')).toHaveCount(2);
  await expect(panel.locator('.script-item[data-type="text"]')).toHaveCount(3);
  await expect(panel.locator('.script-item[data-type="email"]')).toHaveCount(1);
});

// ==========================================
// 11. Calculator: discipline log appears
// ==========================================
test('calculator generates discipline log on submit', async ({ page }) => {
  await page.goto('/tools/calculator.html');
  const log = page.locator('#discipline-log');
  // Initially hidden
  await expect(log).toBeHidden();
  // Click calculate
  await page.click('button:has-text("Calculate My Daily Calls")');
  // Results should show
  await expect(page.locator('#calc-results')).toBeVisible();
  // Discipline log should show
  await expect(log).toBeVisible();
  // Should contain category headers
  await expect(log).toContainText('Fresh Leads');
  await expect(log).toContainText('Pipeline Follow-Up');
  await expect(log).toContainText('Service Lane');
  await expect(log).toContainText('Past Customers');
  // Should have checkboxes
  const checkboxes = log.locator('input[type="checkbox"]');
  const cbCount = await checkboxes.count();
  expect(cbCount).toBeGreaterThan(0);
});

// ==========================================
// 12. Script cards: 15 cards total
// ==========================================
test('script cards has exactly 15 cards', async ({ page }) => {
  await page.goto('/tools/scripts-cards.html');
  const cards = page.locator('.script-card');
  await expect(cards).toHaveCount(15);
});

// ==========================================
// 13. Script cards: legend updated
// ==========================================
test('script cards legend shows correct ranges', async ({ page }) => {
  await page.goto('/tools/scripts-cards.html');
  const legend = page.locator('section:has(h3:has-text("Category Legend"))');
  await expect(legend).toContainText('Cards 1-6');
  await expect(legend).toContainText('Cards 7-10');
  await expect(legend).toContainText('Cards 11-14');
  await expect(legend).toContainText('Card 15');
});

// ==========================================
// 14. Module 2: has 6 touchpoint days
// ==========================================
test('module-2 shows days 1, 2, 5, 12, 25, 30', async ({ page }) => {
  await page.goto('/modules/module-2-followup-system.html');
  const dayBadges = page.locator('.day-badge');
  await expect(dayBadges).toHaveCount(6);
});

// ==========================================
// 15. Module 2: has silence gap sections
// ==========================================
test('module-2 has silence gap sections', async ({ page }) => {
  await page.goto('/modules/module-2-followup-system.html');
  const body = await page.textContent('body');
  expect(body).toContain('Days 3-4: No Contact');
  expect(body).toContain('Days 6-11: No Contact');
  expect(body).toContain('Days 13-24: No Contact');
});

// ==========================================
// 16. Module 2: uses CSS channel labels (not emojis)
// ==========================================
test('module-2 uses CSS channel labels', async ({ page }) => {
  await page.goto('/modules/module-2-followup-system.html');
  const callLabels = page.locator('.channel-label-call');
  const textLabels = page.locator('.channel-label-text');
  expect(await callLabels.count()).toBeGreaterThan(0);
  expect(await textLabels.count()).toBeGreaterThan(0);
});

// ==========================================
// 17. Index: updated descriptions
// ==========================================
test('index has updated module-2 and calendar descriptions', async ({ page }) => {
  await page.goto('/');
  const body = await page.textContent('body');
  expect(body).toContain('6 strategic touchpoints');
  expect(body).toContain('36 scripts across 6 touchpoints');
});

// ==========================================
// 18. Timeline: 30 segments, 6 active
// ==========================================
test('calendar timeline has 30 segments with 6 active', async ({ page }) => {
  await page.goto('/tools/calendar.html');
  await page.setViewportSize({ width: 1280, height: 800 });
  const segments = page.locator('.timeline-segment');
  await expect(segments).toHaveCount(30);
  const active = page.locator('.timeline-segment.active');
  await expect(active).toHaveCount(6);
});
