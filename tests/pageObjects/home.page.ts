import { Page, expect } from "@playwright/test";

class HomePage{

    page: any;
    userName: any;
    password: any;
    loginButton: any;


    constructor(page){
        this.page = page;
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async enterUsername(username : string){
        await this.userName.clear();
        await this.userName.fill(username);
    }
    async enterPassword(password : string){
        await this.password.clear();
        await this.password.fill(password);
    }

    async login(username: string, password: string){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.loginButton.click();
        this.page.waitForTimeout(1000);
        expect (await this.page.url()).toContain("inventory");
    }
    
}

export default HomePage;