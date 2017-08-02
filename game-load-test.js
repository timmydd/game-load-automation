var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    gamenames = require('./gmi-game-names.js'),
    baseURL = 'https://www.test.bbc.co.uk/',
    timeOut = 100000,
    timer,
    i = 0,
    areFailures = false,
    failureCounter = 0,
    passCounter = 0,
    timeoutCounter = 0,
    gameName = gamenames.GameNames();

page.onResourceRequested = onResourceRequested;

page.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
    // uncomment to log into the console 
    // console.error(msgStack.join('\n'));
};


function onResourceRequested(requestData, networkRequest) {
    if (isStat(requestData)) {
        //' Paranoia: May keep things a little more stable if stats calls return quickly:
        networkRequest.changeUrl("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
    }

    if (isErrorStat(requestData)) {
        // Browser console.log is returned in stdout anyway, so don't need to scrape page:
        //console.log(page.plainText);
        testFinished("fail");
    }
    else if (isGameLoadedStat(requestData)) {
        passCounter ++;
        testFinished("pass");
    }
}

loadURL();

function loadURL(){
    page.open(baseURL + gameName[i], function (status) {
        areFailures = false;
        console.log("Starting test for GID: " + gameName[i]);
        page.evaluate(function() {
            document.getElementsByClassName('game-wrapper__cta-button')[0].click();    
            timer = setTimeout(function () {
                document.getElementsByClassName('game-wrapper__cta-button') [0].click();
            }, 10000);
            
        });
        if (status !== 'success') {
            areFailures = true; 
            failureCounter ++;
            testFinished('Bad URL: ' + gameName[i]);
        } else {
            timer = setTimeout(function () {
                areFailures = true;
                timeoutCounter ++;
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
    // Phantom crashes if exit is not deferred (from onResourceRequested callback, anyway):
    setTimeout(function () {
        i++;
        if (i >= gameName.length) {
            phantom.exit(0);

        } else {
            loadURL();
            console.log(failureCounter + ' Failed ' + passCounter + ' Passed' + timeoutCounter + ' Timed out');

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
    page.render('screenshots/' + gameName[i] + '.png');
}