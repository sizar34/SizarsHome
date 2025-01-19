import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/InventoryPage';

test.describe('Navigation Functionality', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.navigateTo();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Navigation bar remains accessible', async ({ page }) => {
        await expect(inventoryPage.cartButton).toBeVisible();
    });

    test('Cart button navigates to cart page', async ({ page }) => {
        await inventoryPage.navigateToCart();
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/.*cart.html/);  // Check URL after navigation to cart
    });
});
