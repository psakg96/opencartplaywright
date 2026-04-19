/**
 * Test Case: Account Registration
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Navigate to application URL
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { randomDataUtil } from "../utils/randomDataGenerator";
import { TestConfig } from "../test.config";

let homepage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  const config = new TestConfig();
  await page.goto(config.appUrl);
  homepage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("User Registration test @master @sanity @regression", async ({ page }) => {
  //const config = new TestConfig()
  //await page.goto(config.appUrl)

  //const homepage = new HomePage(page)
  await homepage.clickMyAccount();
  await homepage.clickRegister();

  //const registrationPage = new RegistrationPage(page)
  await registrationPage.setFirstName(randomDataUtil.getFirstName());
  await registrationPage.setLastName(randomDataUtil.getlastName());
  await registrationPage.setEmail(randomDataUtil.getEmail());
  await registrationPage.setTelephone(randomDataUtil.getPhoneNumber());

  const password = randomDataUtil.getPassword();
  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password);

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();

  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");

  await page.waitForTimeout(3000);
});
