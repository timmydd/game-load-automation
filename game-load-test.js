var page = require('webpage').create(),
    system = require('system'),
    baseURL = 'http://play.bbc.co.uk/play/pen/',
    playpenGID = [
        'g9qw57b51h',
        'g5t4qgzxny',
        'gmm269xwnq',
        'gjkwz4tlrm',
        'gnkrwjbvsj',
        'g2zyvrx1k8',
        'g6ksdxg8cs',
        'gqgw1yg9x7',
        'gplxtqsfmf',
        'g7rh7b3d4q',
        'g7vwrbdqgl',
        'g9xktt8lgy',
        'gwhwzp9c3l',
        'gbq87ldxnx',
        'gw5b64r1v4',
        'g4k4spn8t7',
        'gldbhs9x5x',
        'ghdcsb77mr',
        'g6j9sqqqpv',
        'g9rjlzj9gm',
        'gxfkxn1bkj',
        'gvy3g3mcmz',
        'gnzr7lndgg',
        'g1p6k4rr1m',
        'gdvy86crvl',
        'g4pjrgd6v2',
        'gfxdjgry3h',
        'ggfw5fhksn',
        'g4g53h7zxq',
        'gkbqf3gzjf',
        'gg3rgvg767',
        'gg65sy3gkw',
        'gny3l9x6zg',
        'gbnh54p7hr',
    ],
    timeOut = 60000;

var timer;
var i = 0;
var areFailures = false;

page.onResourceRequested = onResourceRequested;

function onResourceRequested(requestData, networkRequest) {
    if (isStat(requestData)) {
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
    page.open(baseURL + playpenGID[i], function (status) {
        areFailures = false;
        console.log("Starting test for GID: " + playpenGID[i]);
        if (status !== 'success') {
            areFailures = true; 
            testFinished('Bad URL: ' + playpenGID[i]);
        } else {
            timer = setTimeout(function () {
                areFailures = true;
                testFinished("timeout");           
            }, timeOut);
        }
    });
}

function testFinished(status){
    clearTimeout(timer);
    console.log('Test: ' + status);
    if(areFailures){
        printScreen();
    }
    //page.render('screenshots/' + page.title + '.png');
    // Phantom crashes if exit is not deferred (from onResourceRequested callback, anyway):
    setTimeout(function () {
        i++;
        if (i >= playpenGID.length) {
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

function printScreen(){
    page.render('screenshots/' + page.title + '.png');
}