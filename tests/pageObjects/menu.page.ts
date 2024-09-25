import {expect} from '@playwright/test'

class MenuPage{
page:any;
hambergerMenu:any;
logoutButton:any;

constructor(page){
    this.page = page;
    this.hambergerMenu = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
}

async clickHambergerMenu(){
    await this.hambergerMenu.click();
}

async logout(){
    await this.logoutButton.click();
    expect (await this.page.url()).toBe('https://www.saucedemo.com/')
}

}

export default MenuPage;