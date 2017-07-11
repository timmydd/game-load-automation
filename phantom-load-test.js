var page = require('webpage').create(),
    system = require('system'),
    resources = [],
    address = 'http://play.bbc.co.uk/play/pen/gjkwz4tlrm?exitGameUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fgames%2Fthe-worst-witch-magic-adventure-game%3Fembed%3Dtrue&embed=true',
    timeOut = 6000;

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {
        setTimeout(function () {
            page.render(page.title + ".png");
            phantom.exit();
        }, timeOut);
    }
});