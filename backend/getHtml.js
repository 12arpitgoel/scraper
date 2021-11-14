require("chromedriver");
const fs= require("fs");
let wd = require("selenium-webdriver");



let main=async function(link){
    try{
        let browser = await new wd.Builder().forBrowser('chrome').build();
        await browser.get(link);
        let html=await browser.findElement(wd.By.css("body"));
        let data=await html.getAttribute('innerHTML');

        let exp=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        data=data.replace(exp, "");
        browser.close();
        return {
            "message":"success",
            "html":data
        }
    }
    catch(err){
        browser.close();
        return {
            "message":err.message
        }
    }
    
    
}

module.exports = main;
