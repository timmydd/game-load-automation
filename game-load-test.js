var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    baseURL = 'https://www.test.bbc.co.uk/',
    timeOut = 100000,
    timer,
    i = 0,
    areFailures = false,
    failureCounter = 0,
    passCounter = 0,
    gameName = [
        'cbeebies/games/my-swashbuckle-adventure',
        'cbbc/games/the-next-step',
        'cbbc/games/danger-mouse-game',
        'cbeebies/games/peter-rabbit',
        'cbeebies/games/my-pet-and-me-game',
        'cbeebies/games/my-pet-and-me-game-alba',
        'cbeebies/games/my-pet-and-me-game-gaeilge',
        'cbbc/games/the-worst-witch-magic-adventure-game',
        'cbeebies/games/the-furchester-hotel-a-helping-hand',
        'cbeebies/games/go-jetters-global-glitch',
        'cbeebies/games/alba-go-jetters-crathadh-cruinneil',
        'cbbc/games/the-dumping-ground-on-a-mission',
        'cbeebies/games/danger-mouse-danger-dash',
        'cbbc/games/bp-hackers-nosey-adventure-game',
        'cbbc/games/pets-factor-furry-friends',
        'cbbc/games/dixi-4',
        'cbbc/games/secret-life-of-boys-2a',
        'cbeebies/games/topsy-and-tim-at-the-farm',
        'cbeebies/games/bing-build-and-play',
        'cbeebies/games/teletubbies-play-day',
        'cbbc/games/operation-ouch-the-snot-apocalypse',
        'cbbc/games/bottersnikes-and-gumbles-gumble-run',
        'cbeebies/games/andys-prehistoric-park',
        'cbeebies/games/something-special-the-looking-game',
        'cbbc/games/horrible-histories-awesome-women-quiz',
        'cbeebies/games/little-roy-wonder-doodler',
        'cbbc/games/airmageddon-flight-patrol-game',
        'cbbc/games/little-roy-wonder-doodler',
        'cbbc/games/wolfblood-comic-alpha',
        'cbbc/games/eve-comic',
        'cbeebies/games/advent-calendar-2016',
        'cbeebies/games/my-pet-and-me-game-cymraeg',
        'cbbc/games/wolfblood-hunters-moon',
        'cbeebies/games/advent-calendar',
        'cbeebies/games/down-on-the-farm-a-year-on-your-farm',
        'cbeebies/games/jamillah-and-aladdin-cave-of-wonders',
        'cbbc/games/absolute-genius-smash-bang-boom',
        'cbeebies/games/apple-tree-house-game',
        'cbeebies/games/charlie-and-lola-making-and-doing',
        'cbeebies/games/justins-house-little-monsters-cheeky-chase-game',
        'cbeebies/games/pablo-art-world-adventure'
    ];


page.onResourceRequested = onResourceRequested;

page.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }

    fs.appendFile('server.log', msgStack.join('\n'), function (err) {
        if (err) return console.log(err);
        console.log('Appended!');
    });
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
        });
        if (status !== 'success') {
            areFailures = true; 
            failureCounter ++;
            testFinished('Bad URL: ' + gameName[i]);
        } else {
            timer = setTimeout(function () {
                areFailures = true;
                failureCounter ++;
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
        console.log(failureCounter + ' Failed ' + passCounter + ' Passed');
    }
    // Phantom crashes if exit is not deferred (from onResourceRequested callback, anyway):
    setTimeout(function () {
        i++;
        if (i >= gameName.length) {
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
    page.render('screenshots/' + gameName[i] + '.png');
}