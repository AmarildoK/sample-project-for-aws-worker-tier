const CDP = require('chrome-remote-interface');
const { wait } = require('./util');

const defaultPrintOptions = {
    landscape: true,
    printBackground: true,
    paperWidth: 11.25,// 1080 height in px
    paperHeight: 20,// 1920 width in px
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
};

/**
 * Take full page screenshot
 *
 * @param url
 * @param printOptions
 * @return {Promise<Buffer>}
 */
async function extractCampaignPdf(url, printOptions) {
    printOptions = printOptions || {};

    //connect to chrome
    const client = await CDP({port: 9222});

    try {
        const { Page } = client;

        await Page.enable();
        await Page.navigate({ url });
        await Page.loadEventFired();

        //dirty fix to let images be loaded first after event fired
        await wait(5000);
        const { data } = await Page.printToPDF(Object.assign(defaultPrintOptions, printOptions));

        return new Buffer(data, 'base64')
    } catch (e) {
        throw e;
    } finally {
        await client.close();
    }
}

module.exports = {
    extractCampaignPdf
};
