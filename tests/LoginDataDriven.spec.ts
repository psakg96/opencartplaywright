import { test, expect } from "@playwright/test"
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
 
//load json test data logindata.json

const jsonPath = "testdata/logindata.json"

const jsonTestData=DataProvider.getTestDatafromJson(jsonPath)
for(const data of jsonTestData)
{
    test(`Login test with json data:${data.testName} @datadriven`, async({page})=>{

        const config =new TestConfig()
        await page.goto(config.appUrl)

        const homepage= new HomePage(page)
        await homepage.clickMyAccount()
        await homepage.clickLogin()

        const loginpage = new LoginPage(page)
        await loginpage.login(data.email, data.password)
        

        if (data.expected.toLowerCase()==='Success')
        {
            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }
        else{
            const errorMessage=await loginpage.getloginErrorMessage();
            //expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
            expect(errorMessage).toContain('Warning: No match for E-Mail Address and/or Password.');
        }


    })
}




