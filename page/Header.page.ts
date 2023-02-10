import { Page } from "@playwright/test";

export default class Header {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public get eleLoginBtn() {
    const loginBtn =  this.page.$("text='Log in'");
    if(loginBtn != null){
        return loginBtn
    } else throw new Error('login button missing')
  }

  public get eleSignOutBtn() {
    const signOutBtn =  this.page.$("text='Sign out '");
    if(signOutBtn != null){
        return signOutBtn
    } else throw new Error('login button missing')
  }

  public async clickLoginLink(){
    const ele = await this.eleLoginBtn;
    await ele?.click();
  }

  public async clickSignOutLink(){
    const ele = await this.eleSignOutBtn;
    await ele?.click();
  }
}
