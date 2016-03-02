var FirefoxProfile = require('firefox-profile');
var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'firefox' } , waitforTimeout: 6000};
var fp = new FirefoxProfile();
var client, webpage;

var rhel7_1 = '10.66.192.234', rhel7_2 = '10.66.192.121';

fp.setPreference("browser.download.folderList",2);
fp.setPreference("browser.download.manager.showWhenStarting",false);
fp.setPreference("browser.download.dir", "/tmp");
fp.setPreference("browser.helperApps.neverAsk.saveToDisk","text/html, application/xhtml+xml, application/xml, application/csv, text/plain, application/vnd.ms-excel, text/csv, text/comma-separated-values, application/octet-stream");

fp.encoded(function(prof) {

    client = webdriverio.remote(
        { desiredCapabilities: { browserName: 'firefox' ,firefox_profile: prof} , waitforTimeout: 6000}
    );

    webpage = client
        .init()
        .url('https://jshi.usersys.redhat.com:4443/labs/dnshelper/');
    webpage.timeoutsImplicitWait(60000).then(executeTest());
});


// function executeTest(){
//     webpage.click('button.submit')
//     .click('button.submit')
//     .setValue('input[name="masterIP"]', rhel7_1)
//     .click('button.submit')
//     // .setValue('input[name="disableView"]', 'true')
//     .click('input[name="disableView"]')
//     .click('button.submit')
//     .click('.content .row .col-md-3 button')
//     .click('button.submit')
//     // .setValue('input[name="defaultFirewall"]', 'true')
//     .click('input[name="defaultFirewall"]')
//     .click('button.submit')
//     .click('button.download[type="submit"]')
//     .pause(20000);
// }


function executeTest(){
    // webpage.setValue('#username', 'rhn-support-jshi')
    // .setValue('#password', '***')
    // .click('button[type="submit"]');
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