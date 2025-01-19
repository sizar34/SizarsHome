import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    private usernameField = this.page.locator('#user-name');
    private passwordField = this.page.locator('#password');
    private loginButton = this.page.locator('#login-button');
    private errorMessage = this.page.locator('[data-test="error"]');

    async navigateTo(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    
    async getErrorMessage(): Promise<string> {
        const errorText = await this.errorMessage.textContent();
        return errorText ?? ''; 
    }
}
