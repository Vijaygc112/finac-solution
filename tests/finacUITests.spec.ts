import { test, expect, Page } from '@playwright/test'
import HomePage from './pageObjects/home.page'
import ProductsPage from './pageObjects/products.page'
import CartPage from './pageObjects/cart.page'
import MenuPage from './pageObjects/menu.page'
import * as constant from './constants'
import * as fs from 'fs';

let homePage: HomePage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let menuPage: MenuPage;
let productNames: string[] = [];
let productPrices: string[] = [];

let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);

    await page.goto('/');
});

test.afterAll(async () => {
    if (fs.existsSync('products.txt')) {
        fs.unlinkSync('products.txt')
    }
});

test.describe('FinacPlus Tests', async () => {

    test('1. Verify login to Sauce Labs', async () => {
        await homePage.login(constant.USERNAME, constant.PASSWORD);
        await productsPage.verifyTitle();
    });

    test('2. Get the first product name and price and write to a file', async () => {
        //pass index as 1 to get first product name
        productNames[0] = await productsPage.getProductName(0);
        productPrices[0] = await productsPage.getProductPrice(0);

        //to console 
        console.log("Product Name is : " + productNames[0] + "\nProduc Price is :  " + productPrices[0]);

        //to file 
        const dataToWriteToFile = `Product Name : ${productNames[0]}, Product Price : ${productPrices[0]} \n`;
        //this overrides any exisitng content in the file
        fs.writeFileSync('products.txt', dataToWriteToFile, 'utf8');
    });

    test('3. Add to cart ', async () => {
        //add first product to cart and verify badge
        await productsPage.addToCart(0);
    });

    test('4. Navigate to card and verify the product name', async () => {
        await productsPage.clickShoppingCartLink();
        //this will fail if the productNames[0] is not in cart
        await cartPage.getCartItemName(productNames[0]);
    })

    test('5. Logout', async () => {
        await menuPage.clickHambergerMenu();
        await menuPage.logout();
    })

})