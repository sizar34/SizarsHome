import { Page } from '@playwright/test';

export class InventoryPage {
    constructor(private page: Page) {}

    private inventoryItems = this.page.locator('.inventory_item');
    public cartButton = this.page.locator('[data-test="shopping-cart-link"]');
    private sauceLabsBikeLight = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')

    async getItemCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async navigateToCart(): Promise<void> {
        await this.cartButton.click();
    }

    async ClickAddSauceLabsBikeLight():Promise<void> {
        await this.sauceLabsBikeLight.click();
    }    
}
