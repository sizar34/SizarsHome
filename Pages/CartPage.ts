import { Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    private checkoutButton = this.page.locator('[data-test="checkout"]');
    private cartItems = this.page.locator('.cart_item');

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
