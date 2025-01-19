import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import users from '../test-data/users.json';

test.describe('Data-driven Login Tests', () => {
    users.forEach(({ username, password, isValid }) => {
        test(`Login test for user: ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigateTo();
            await loginPage.login(username, password);

            if (isValid) {
                await expect(page).toHaveURL(/.*inventory.html/);
            } else {
                const errorMessage = await loginPage.getErrorMessage();
                expect(errorMessage).toBeTruthy();
            }
        });
    });
});
