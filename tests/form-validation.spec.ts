import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { CartPage } from '../Pages/CartPage';
import { InventoryPage } from '../Pages/InventoryPage';

test.describe('Form Validation', () => {
    let loginPage: LoginPage;
    let cartPage: CartPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.navigateTo();
        await loginPage.login('standard_user', 'secret_sauce');
        
    // Choosing product and moving to Form page
        await inventoryPage.ClickAddSauceLabsBikeLight();
        await inventoryPage.navigateToCart();
        await cartPage.proceedToCheckout();
    });

    test('Checkout form shows error for missing required fields', async ({ page }) => {

        // Assuming the checkout form has a first name field
        await page.click('[data-test="continue"]');
        const errorMessage = await page.locator('[data-test="error"]').textContent();
        expect(errorMessage).toContain('Error: First Name is required');
    });

    test('Successful form submission with valid data', async ({ page }) => {

        // Fill out the form
        await page.fill('[data-test="firstName"]', 'Sizar');
        await page.fill('[data-test="lastName"]', 'Simaan');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');

        // Verify navigation to the next page
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });
});
