var page = require('webpage').create(),
    system = require('system'),
    async = require('async'),
    resources = [],
    myURLS = ['http://play.bbc.co.uk/play/pen/gjkwz4tlrm?exitGameUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fgames%2Fthe-worst-witch-magic-adventure-game%3Fembed%3Dtrue&embed=true',
              'http://play.bbc.co.uk/play/pen/gxfkxn1bkj?exitGameUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fgames%2Foperation-ouch-the-snot-apocalypse'],
    timeOut = 7000;

page.open(myURLS[1], function (status) {
    console.log("Starting Tests...");
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {
        setTimeout(function () {
            console.log("Page loaded, taking screenshot...");
            page.render('screenshots/' + page.title + '.png');
            console.log(page.title + ' Complete');
            phantom.exit();
        }, timeOut);
    }
});