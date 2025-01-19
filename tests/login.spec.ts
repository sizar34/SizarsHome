import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });

    test('Successful login with valid credentials', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Error message for invalid credentials', async () => {
        await loginPage.login('invalid_user', 'wrong_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });

    test('Validation for empty fields', async () => {
        await loginPage.login('', '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username is required');
    });
});
