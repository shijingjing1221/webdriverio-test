var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    },
    waitforTimeout: 6000
};
var client = webdriverio.remote(options);

var webpage = client
    .init()
    .url('https://jshi.usersys.redhat.com:4443/labs/dnshelper/');
webpage.getTitle().then(function (title) {
        console.log('Title is: ' + title);
        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    })
    .timeoutsImplicitWait(60000)
    .then(function () {
        // webpage.setValue('#username', 'rhn-support-jshi')
        // .setValue('#password', '**')
        // .click('button[type="submit"]');
        webpage.click('button.submit')
            .click('button.submit')
            .setValue('input[name="masterIP"]', '10.66.192.234')
            .click('button.submit')
            // .setValue('input[name="disableView"]', 'true')
            .click('input[name="disableView"]')
            .click('button.submit')
            .click('.content .row .col-md-3 button')
            .click('button.submit')
            // .setValue('input[name="defaultFirewall"]', 'true')
            .click('input[name="defaultFirewall"]')
            .click('button.submit')
            .click('button.download[type="submit"]');
    });