var FirefoxProfile = require('firefox-profile');
var webdriverio = require('webdriverio');
var client, webpage, config = require("./config.json");
var fp = new FirefoxProfile();
var fs = require('fs');

var rhel7_1 = config.rhel7_1,
    rhel7_2 = config.rhel7_2;

fp.setPreference("browser.download.folderList", 2);
fp.setPreference("browser.download.manager.showWhenStarting", false);
fp.setPreference("browser.download.dir", "/tmp");
fp.setPreference("browser.helperApps.neverAsk.saveToDisk", "text/html, application/xhtml+xml, application/xml, application/csv, text/plain, application/vnd.ms-excel, text/csv, text/comma-separated-values, application/octet-stream");

var login = function (webpage) {
    // webpage.setValue('#username', config.username)
    // .setValue('#password', config.pasword)
    // .click('button[type="submit"]');
}

var executeTest = function (webpage) {
    executeTestMaster(webpage);
    // executeTestMasterwithslave(webpage);
    // executeTestCaching(webpage);
    // executeTestForwarder(webpage);
}

var executeTestMaster = function (webpage) {
    //one master node
    webpage.click('button.submit')
        .click('button.submit')
        .setValue('input[name="masterIP"]', rhel7_1)
        .click('button.submit')
        .click('input[name="disableView"]')
        .click('button.submit')
        .click('.content .row .col-md-3 button')
        .click('button.submit')
        .click('input[name="defaultFirewall"]')
        .click('button.submit')
        .click('button.download[type="submit"]')
        .pause(20000)
        .end();
}

var executeTestMasterwithslave = function (webpage) {
    //Master with slave node
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

var executeTestCaching = function (webpage) {
    //Cache only withOUT forwarder
    webpage.click('button.submit') //Select Version by default, and next
        .click('.radio input[value="cacheonly"]') //select type of nameserver cacheonly
        .click('button.submit') //Next
        .click('input[name="noForwarder"]') //click 'No forwarder'
        .click('button.submit')
        .click('input[name="defaultFirewall"]') //Click default firewall
        .click('button.submit')
        .click('.content .row button.download[type="submit"]')
        .pause(20000)
        .end();
}

var executeTestForwarder = function (webpage) {
    //Cache only with forwarder
    webpage.click('button.submit') //Select Version by default, and next
        .click('.radio input[value="cacheonly"]') //select type of nameserver cacheonly
        .click('button.submit') //Next
        .click('input[name="usingForwarder"]') //click 'Using forwarder'
        .setValue('input[name="followerIP"]', config.forwarder)
        .click('button.submit')
        .click('input[name="defaultFirewall"]') //Click default firewall
        .click('button.submit')
        .click('.content .row button.download[type="submit"]')
        .pause(20000)
        .end();
}

fp.encoded(function (prof) {

    client = webdriverio.remote({
        desiredCapabilities: {
            browserName: 'firefox',
            firefox_profile: prof
        },
        waitforTimeout: 6000
    });

    var folder = [];
    fs.readdir(config.script_folder, function (err, items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.match(/dnshelper.*\.sh/) != null) {
                console.log(item);
                fs.unlink(config.script_folder + "/" + item);
            }
        }
    });
    initClient = client.init();
    webpage1 = initClient
        .url(config.url);
    webpage1.timeoutsImplicitWait(60000).then(executeTest(webpage1));

    // webpage1 = initClient
    //     .url(config.url);
    // webpage1.timeoutsImplicitWait(60000).then(executeTestMaster(webpage1));
    //
    // webpage2 = initClient
    //     .newWindow(config.url);
    // webpage2.timeoutsImplicitWait(60000).then(executeTestMasterwithslave(webpage2));
    //
    // webpage3 = initClient
    //     .newWindow(config.url);
    // webpage3.timeoutsImplicitWait(60000).then(executeTestCaching(webpage3));

    // var testCases = [executeTestMaster, executeTestMasterwithslave, executeTestCaching, executeTestForwarder];
    // for (var index in testCases) {
    //     var testCase = testCases[index];
    //     var page = client
    //         .url(config.url);
    //     // .newWindow(config.url)
    //     page.timeoutsImplicitWait(60000).then(testCase(page));
    //     // webpage.timeoutsImplicitWait(60000).then(testCase());
    // };
});