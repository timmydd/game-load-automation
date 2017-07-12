var page = require('webpage').create(),
    system = require('system'),
    async = require('async'),
    resources = [],
    myURLS = ['http://play.bbc.co.uk/play/pen/gxfkxn1bkj?exitGameUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fgames%2Foperation-ouch-the-snot-apocalypse',
              'http://play.bbc.co.uk/play/pen/gjkwz4tlrm?exitGameUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fgames%2Fthe-worst-witch-magic-adventure-game%3Fembed%3Dtrue&embed=true'],
    timeOut = 30000;

var timer;
var i = 0;

    page.onResourceRequested = onResourceRequested;

    function onResourceRequested(requestData, networkRequest) {
        if (isStat(requestData)) {
            console.log("Stat found", i);
            console.log(requestData.url);
            // Paranoia: May keep things a little more stable if stats calls return quickly:
            networkRequest.changeUrl("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
        }

        if (isErrorStat(requestData)) {
            // Browser console.log is returned in stdout anyway, so don't need to scrape page:
            //console.log(page.plainText);
            testFinished("fail");
        }
        else if (isGameLoadedStat(requestData)) {
            testFinished("pass");
        }
    }

loadURL();

function loadURL(){
    page.open(myURLS[i], function (status) {
        console.log("Starting Test " + myURLS[i]);
        if (status !== 'success') {
            console.log('Unable to load the address!');
            testFinished('Bad URL: ' + myURLS[i]);
        } else {

            timer = setTimeout(function () {
                testFinished("Timeout");            
            }, timeOut);
        }
    });
}

function testFinished(status){
    clearTimeout(timer);
    console.log('Test finished with: ' + status);
    //page.render('screenshots/' + page.title + '.png');
    // Phantom crashes if exit is not deferred (from onResourceRequested callback, anyway):
    setTimeout(function () {
        i++;
        if (i >= myURLS.length) {
            phantom.exit(0);

        } else {
            loadURL();
        }
    }, 1);
}

function isStat(requestData) {
    return /sa\.bbc\.co\.uk.*\b/.test(requestData.url);
}

function isErrorStat(requestData) {
    var errorStatRe = /sa\.bbc\.co\.uk.*\baction_name=game_error\b/;
    return errorStatRe.test(requestData.url);
}

function isGameLoadedStat(requestData) {
    var hasLoadedRe = /sa\.bbc\.co\.uk.*\baction_name=game_loaded\b/;
    var hasTrueRe = /sa\.bbc\.co\.uk.*\baction_type=true\b/;

    return hasLoadedRe.test(requestData.url) && hasTrueRe.test(requestData.url);
}