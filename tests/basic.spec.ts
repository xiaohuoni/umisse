import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  const isVisible = await page
    .getByText('自用的 Umi@4 + Antd@5 项目模板')
    .isVisible();
  if (!isVisible) {
    await page.locator('nav > span:nth-child(3) > svg').click();
  }
});

test.describe('basic', () => {
  test('render', async ({ page }) => {
    await expect(page.getByText('[Home Layout]')).toBeVisible();
  });
  test.describe('locales', () => {
    test('toggle langs', async ({ page }) => {
      await expect(
        page.getByText('自用的 Umi@4 + Antd@5 项目模板'),
      ).toBeVisible();
      await page.getByTestId('toggle_langs').click();
      await expect(
        page.getByText('Opinionated Umi@4 + Antd@5 Starter Template'),
      ).toBeVisible();
    });
  });
  test.describe('theme', () => {
    test('toggle theme', async ({ page }) => {
      await expect(page.locator('a').first()).toHaveCSS(
        'color',
        'rgb(22, 119, 255)',
      );
      await page.getByTestId('toggle_theme').click();
      // TODO: why the background is 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'
      await expect(page.locator('a').first()).toHaveCSS(
        'background',
        'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
      );
    });

    test('toggle theme no rerender', async ({ page }) => {
      const text = await page.locator('p').last().innerText();
      await page.getByTestId('toggle_theme').click();
      await expect(await page.locator('p').last().innerText()).toBe(text);
    });

    test('change color primary', async ({ page }) => {
      await page.getByTestId('color_primary').click();
      await page.getByTitle('#D0021B').click();
      // TODO: why the background is 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'
      await expect(page.locator('a').first()).toHaveCSS(
        'background',
        'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
      );
    });
  });
  test.describe('md support', () => {
    test('render', async ({ page }) => {
      await page.getByTestId('contact').click();
      await expect(page.getByText('About')).toBeVisible();
      const pre = await page.locator('pre');
      await expect(pre).toHaveCSS('text-align', 'left');
    });
  });

  test.describe('404 support', () => {
    test('render', async ({ page }) => {
      await page.goto('/404');
      await expect(page.getByText('[404 Layout]')).toBeVisible();
    });
  });
});
