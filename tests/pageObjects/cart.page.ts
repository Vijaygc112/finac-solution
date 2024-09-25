import {expect} from '@playwright/test'

class CartPage{
page:any;
title:any;
cartItmes: any;
cartItemQuantity: any;
cartItemName: any;
cartItmePrice: any;

constructor(page){
    this.page = page;
    this.title = page.locator('.title');
    this.cartItmes = page.locator('.cart_list');
    this.cartItemQuantity = page.locator('.cart_quantity');
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItmePrice = page.locator('.inventory_item_price');
}

async getCartItemName(productName: string):Promise<string>{
    return (await this.cartItmes.getByText(productName)).textContent();
}

}

export default CartPage;
