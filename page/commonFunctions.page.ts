import { Page } from "@playwright/test";

export default class CommonFunctoins{
    private page : Page
    constructor(page : Page){
        this.page = page;
    }

    toaster = async()=> await this.page.waitForSelector("div[role='alertdialog']")
    

   /*  public async verifyToastMessage(){
        return
    } */
}