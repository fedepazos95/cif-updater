const puppeteer = require('puppeteer');

const getBodyRecord = (categoryId, accountId, currencyId, amount) => {
    console.log('amount', amount);
    return `
    [
        {
            "categoryId":"${categoryId}",
            "accountId":"${accountId}",
            "currencyId":"${currencyId}",
            "amount": ${amount},
            "paymentType":"cash",
            "recordState":"cleared"
        }
    ]`;
}

module.exports = async function postRecord(categoryId, accountId, currencyId, amount) {
    console.log('amoumt', amount);
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('https://budgetbakersv30apiv1.docs.apiary.io/#reference/records/record-bulk-creation/create-new-record?console=1');
    // Click on Headers
    await page.click('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.formRow.consoleFormRow.consoleFormTabs > div > ul > li.buttonGroupItem.buttonGroupItemHeaders');
    // Select value of X-Token and type the toke
    await page.click('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.consoleFormTab.consoleFormHeadersTab > div > div > div:nth-child(2) > input.console-kit__request-parameter__value-input', { clickCount: 3 });
    await page.type('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.consoleFormTab.consoleFormHeadersTab > div > div > div:nth-child(2) > input.console-kit__request-parameter__value-input', 'c77855ca-8584-4652-88b4-764c838945e4');
    // Select value of X-User and type the user
    await page.click('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.consoleFormTab.consoleFormHeadersTab > div > div > div:nth-child(3) > input.console-kit__request-parameter__value-input', { clickCount: 3 });
    await page.type('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.consoleFormTab.consoleFormHeadersTab > div > div > div:nth-child(3) > input.console-kit__request-parameter__value-input', 'fede.pazos95@gmail.com');
    //Click on Body
    await page.click('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.formRow.consoleFormRow.consoleFormTabs > div > ul > li.buttonGroupItem.buttonGroupItemBody');
    // Click on textarea
    await page.click('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.consoleFormTab.consoleFormBodyTab > div > textarea');

    // Select the textarea of the body request and clears it
    await page.evaluate(() => {
        document.querySelector('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.consoleFormTab.consoleFormBodyTab > div > textarea').value = ''
    });
    // Type the body's request on the textarea
    await page.type('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div.machineColumnConsole > div.console.privateConsole > form > div.consoleFormTab.consoleFormBodyTab > div > textarea', getBodyRecord(categoryId, accountId, currencyId, amount));;
    // Press de submit button
    await page.click('#documentationMachineColumn > div > div.row.machineColumnConsoles.customScrollbar.customScrollbarConsole > div:nth-child(2) > div.console.privateConsole > form > div.formRow.consoleFormRow.consoleFormButtons > div.consoleFormSubmitButton');
    // Waits the response to close
    await page.waitFor(5000);
    browser.close();
}