import { test, expect } from '@playwright/test';

test('e2e test for blog', async ({ page }) => {
  // Step 1: Open the app
  await page.goto('/');

  // Step 2: Click on "posts" icon
  await page.click('text=posts');

  // Step 3: Verify that a window with posts is opened
  const postsWindow = page.locator('text=List of posts');
  await expect(postsWindow).toBeVisible();

  // Step 4: Open any blog post
  const firstPost = page.locator('text=Post').first();
  await firstPost.click();

  // Step 5: Verify that post opens in the same window
  const postContent = page.locator('text=Comments');
  await expect(postContent).toBeVisible();

  // Step 6: Check if all images loaded
  const images = page.locator('img');
  const imageCount = await images.count();
  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', /.+/);
  }
});
