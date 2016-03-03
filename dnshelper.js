var FirefoxProfile = require('firefox-profile');
var webdriverio = require('webdriverio');
var client, webpage, config = require("./config.json");
var fp = new FirefoxProfile();

var rhel7_1 = config.rhel7_1,
    rhel7_2 = config.rhel7_2;

fp.setPreference("browser.download.folderList", 2);
fp.setPreference("browser.download.manager.showWhenStarting", false);
fp.setPreference("browser.download.dir", "/tmp");
fp.setPreference("browser.helperApps.neverAsk.saveToDisk", "text/html, application/xhtml+xml, application/xml, application/csv, text/plain, application/vnd.ms-excel, text/csv, text/comma-separated-values, application/octet-stream");

fp.encoded(function (prof) {

    client = webdriverio.remote({
        desiredCapabilities: {
            browserName: 'firefox',
            firefox_profile: prof
        },
        waitforTimeout: 6000
    });

    webpage = client
        .init()
        .url(config.url);
    webpage.timeoutsImplicitWait(60000).then(executeTest());
});

function login() {
    // webpage.setValue('#username', config.username)
    // .setValue('#password', config.pasword)
    // .click('button[type="submit"]');
}

// function executeTest(){
//     webpage.click('button.submit')
//     .click('button.submit')
//     .setValue('input[name="masterIP"]', rhel7_1)
//     .click('button.submit')
//     .click('input[name="disableView"]')
//     .click('button.submit')
//     .click('.content .row .col-md-3 button')
//     .click('button.submit')
//     .click('input[name="defaultFirewall"]')
//     .click('button.submit')
//     .click('button.download[type="submit"]')
//     .pause(20000);
// }

function executeTest() {

    webpage.click('button.submit')
        .click('.radio input[value="slave"]')
        .click('button.submit')
        .setValue('input[name="masterIP"]', rhel7_1)
        .setValue('input[name="slaveServerIP"]', rhel7_2)
        .click('button.submit')
        .click('input[name="disableView"]')
        .click('button.submit')
        .click('.content .row .col-md-3 button')
        .click('button.submit')
        .click('input[name="defaultFirewall"]')
        .click('button.submit')
        .click('.content .row button.download[type="submit"]')
        .click('.content .row:nth-child(2) button.download[type="submit"]')
        .pause(20000)
        .end();
}