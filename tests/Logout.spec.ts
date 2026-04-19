/**
 * Test Case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */

import {test, expect} from '@playwright/test'

import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { MyAccountPage } from '../pages/MyAccountPage'
import { LogoutPage } from '../pages/LogoutPage'
import { TestConfig } from '../test.config'

//Declare shared variables

let config : TestConfig
let homePage:HomePage
let myAccountPage:MyAccountPage
let loginPage:LoginPage
let logoutpage:LogoutPage

//setup before each test

test.beforeEach(async ({page})=>{
    config=new TestConfig()
    await page.goto(config.appUrl)

    //Initialise page objects

homePage = new HomePage(page)
myAccountPage=new MyAccountPage(page)
loginPage = new LoginPage(page)
logoutpage = new LogoutPage(page)

})

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close the browser tab (helps keep tests clean)
});

test('user logout test @master @regression', async({page})=>{

await homePage.clickMyAccount()
await homePage.clickLogin()

await loginPage.login(config.email,config.password)

expect (await myAccountPage.isMyAccountPageExists()).toBeTruthy()

 // Step 5: Click Logout, which returns LogoutPage instance
  logoutpage = await myAccountPage.clickLogout();

  // Step 6: Verify "Continue" button is visible before clicking
  expect(await logoutpage.isContinueButtonVisible()).toBe(true);

  // Step 7: Click Continue and verify redirection to HomePage
  homePage = await logoutpage.clickContinue();
  expect(await homePage.isHomePageExists()).toBe(true);


})


