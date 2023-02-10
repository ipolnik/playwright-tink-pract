import { Page } from "@playwright/test";

export default class LoginPage {

   private page : Page;

   constructor(page : Page) {
      this.page = page;
   }
   
   eleEmailTextField = async () => await this.page.$("input[name='email']")
   
   public get elePassTextField (){return  this.page.$("input[name='password']");}

   public get eleLoginBtn2 (){
    return  this.page.$("//button[text()='LOGIN']")
   }
   
   public async enterUserName(nameEl : string){
    const textEmail = await this.eleEmailTextField();
    await textEmail?.fill(nameEl);
   }

   public async enterUserPassword(pass : string){
    const textEmail = await this.elePassTextField;
    await textEmail?.fill(pass);
   }

   public async clickLoginBtn(){
    const textEmail = await this.eleLoginBtn2;
    await textEmail?.click();
   }
}