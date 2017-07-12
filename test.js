var page = require('webpage').create();

// the urls to navigate to
var urls = [
    'http://play.bbc.co.uk/play/pen/gjkwz4tlrm?exitGameUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fgames%2Fthe-worst-witch-magic-adventure-game%3Fembed%3Dtrue&embed=true',
    'http://play.bbc.co.uk/play/pen/gxfkxn1bkj?exitGameUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fgames%2Foperation-ouch-the-snot-apocalypse'
];

var i = 0;

// the recursion function
var genericCallback = function () {
    return function (status) {
        console.log("URL: " + urls[i]);
        console.log("Status: " + status);
        // exit if there was a problem with the navigation
        if (!status || status === 'fail') phantom.exit();

        i++;

        if (status === "success") {

            //-- YOUR STUFF HERE ---------------------- 
            // do your stuff here... I'm taking a picture of the page
            setTimeout(function() {
                page.render('screenshots/' + page.title + '.png');
            //-----------------------------------------

            if (i < urls.length) {
                // navigate to the next url and the callback is this function (recursion)
                page.open(urls[i], genericCallback());
            } else {
                // try navigate to the next url (it is undefined because it is the last element) so the callback is exit
                page.open(urls[i], function () {
                    phantom.exit();
                });
            })
            
            }
        }
    }
};

// start from the first url
page.open(urls[i], genericCallback());