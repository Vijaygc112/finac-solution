import { expect } from '@playwright/test';

class ProductsPage {
    page: any;
    title: any;
    inventoryItems: any;
    inventoryItemName: any;
    inventoryItemPrice: any;
    addToCartButton: any;
    shoppingCartLink: any;
    shoppingCartBadge: any;

    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryItemName = page.locator('.inventory_item_name');
        this.inventoryItemPrice = page.locator('.inventory_item_price');
        this.addToCartButton = page.locator('.btn_inventory');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async verifyTitle() {
        await expect(await this.title).toHaveText('Products');
    }

    async getProductName(index: number): Promise<string> {
        const item = await this.inventoryItems.nth(index);
        return await item.locator(this.inventoryItemName).textContent();
    }

    async getProductPrice(index: number): Promise<string> {
        const item = await this.inventoryItems.nth(index);
        return await item.locator(this.inventoryItemPrice).textContent();
    }

    async addToCart(indexNumber: number) {
        const item = await this.inventoryItems.nth(indexNumber);
        const addToCartBtn = item.locator(this.addToCartButton);
        await addToCartBtn.click();
        expect(await addToCartBtn).toHaveText('Remove');
        expect(await this.shoppingCartBadge).toHaveText('1');
    }

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
}

export default ProductsPage;