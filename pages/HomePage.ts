import { Page, Locator } from '@playwright/test';
export class HomePage{

    private readonly page:Page;

    //locators
    private readonly linkMyAccount:Locator
    private readonly linkRegister:Locator
    private readonly linkLogin:Locator
    private readonly txtSearchbox:Locator
    private readonly btnSearch:Locator

    //consturctor
    constructor(page:Page){
        this.page=page
        this.linkMyAccount = page.locator("a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']")
        this.linkRegister = page.locator('a').filter({ hasText: 'Register' }).first()
        this.linkLogin = page.locator('a').filter({ hasText: 'Login' }).first()
        this.txtSearchbox = page.locator("input[placeholder='Search']")
        this.btnSearch = page.locator("button[class='btn btn-default btn-lg']")
    }

    //Action methods
    // check if home page exists

    async isHomePageExists(){
        let title:string = await this.page.title();
        if(title)
        {
            return true;
        }
        return false;
    }

    // click on My account link
    async clickMyAccount(){
        try{
            await this.linkMyAccount.click();
        }catch(error) {
            console.log(`Exception occured while clicking on 'myaccount': ${error}`)
            throw error;
        }
    }

// click on Register link
    async clickRegister(){
        try{
            await this.linkRegister.click();
        }catch(error) {
            console.log(`Exception occured while clicking on 'Register': ${error}`)
            throw error;
        }
    }

// click on Login link
    async clickLogin(){
        try{
            await this.linkLogin.click();
        }catch(error) {
            console.log(`Exception occured while clicking on 'Login': ${error}`)
            throw error;
        }
    }

    // enter productname in search box
    async enterProductName(pName:string){
        try{
            await this.txtSearchbox.fill(pName);
        }catch(error) {
            console.log(`Exception occured while entering product name: ${error}`)
            throw error;
        }
    }

// click on search button
    async clcikSearch(){
        try{
            await this.btnSearch.click();
        }catch(error) {
            console.log(`Exception occured while clicking on 'search': ${error}`)
            throw error;
        }
    }

}