var page = require('webpage').create(),
    system = require('system'),
    baseURL = 'http://play.bbc.co.uk/play/pen/',
    timeOut = 70000,
    timer,
    i = 0,
    areFailures = false,
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
        'gjtbdmz8r3',
        'g8wsy3p5gp',
        'g1rwp3ss1l',
        'g55rpf7wzj',
        'gpz3fxc1yy',
        'gjvpn7xs1z',
        'g3dghr1qwp',
        'gy68cnwf16',
        'g8f82nnl3k',
        'ghfy8md5p2',
        'gyzmfygccy',
        'gq5q999npc',
        'g4qtkcfg2x',
        'gzrs6ldrkp',
        'glr79px1d2',
        'ggpjwv3ctz',
        'gmf128syk6',
        'g2wmypvtxh',
        'gyz8pctpfx',
        'gb7fzvpgm7',
        'gsd3m2k2by',
        'gkzqvk5845',
        'gp1js2csyn',
        'gs7zvn46fv',
        'gwxk94fmzj',
        'g2jhf4bnv6',
        'gg49vp65b6',
        'gfm85qh7jc',
        'gm1c5s84q5',
        'g6z6l1mfxq',
        'gktyvkrvgq',
        'gvvbyb6yg1',
        'gj9nd838jg',
        'gjgmdq9sky',
        'ggw9jy8wgy',
        'gz3k4b3h6g',
        'g1bs3gm7ng',
        'gc5zzwz6r3',
        'gkt4ss844v',
        'gg98frrztx',
        'gkqzcv5vlr',
        'gt64l93rr9',
        'g3khkx44kk',
        'g6nvsv6bh6',
        'gqmsyskxrc',
        'gcws8lhkhn',
        'gpczdtvft5',
        'gtc5gnbzjh',
        'gst93jf9b5',
        'gvwxz9zryh',
        'gqg2tkpbzn',
        'gyt17sg2zc',
        'gt8hbsclt3',
        'g3m9drznjq',
        'g39grxc4vw',
        'gb5b3yv4w4',
        'g22wqkqfr8',
        'gw3nfm8v1s',
        'grqm6kw67t',
        'gwfyx9lc31',
        'gkpqyqqm9t',
        'grvkng8fy4',
        'g8x89hn6ds',
        'g1m3bbp6q4',
        'gt3vgz7ktw',
        'gm3q99wmll',
        'gdsgpqm46j',
        'g4yt1kk4l3',
        'gy322tbrpg',
        'gb41nqbgld',
        'gjmj2ty196',
        'g5bcgxc12m',
        'g9vpsjtdqn',
        'gdg456vl4j',
        'g35ncfx1jz',
        'ghgy3g7f42',
        'gsxsf3x4f1',
        'g94q1ps7vr',
        'gzhvhwrp2c',
        'g3nr765zrf',
        'gt64jz5l41',
        'g8rxy3vyss',
        'g41vxrhx32',
        'gb6q7fh4rf',
        'gf6y7ghzbp',
        'gz2bzz9dmy',
        'gby6kdwbfq',
        'g8p73961c8',
        'g7fjt86jq5',
        'g4b9qfbv85',
        'gtc4ysd5y3',
        'ggpy3gjsxj',
        'gzxqh6djs2',
        'g1fg1rj9sh',
        'gbfsyyt87n',
        'gw93c21lrz',
        'g8g4hvmd9f',
        'g3yt45mctt',
        'gjfdv7ss58',
        'gdbrlyckhn',
        'gjxgpt9grc',
        'ggv1n38bvj',
        'gxpx2s43tj',
        'g7nsll9fvj',
        'gz2xqvmhdx',
        'gpzndhjqj5',
        'gcr8wc4h3f',
        'g9xyhjcmhr',
        'gvr8ykb1kq',
        'gjfqn7n1dk',
        'gz16cmvqv4',
        'g4h19dzmdk',
        'g3n3phx33r',
        'gzblskm72l',
        'g2ls24f3vw',
        'g85zxtwypw',
        'ggkx1rwzmm',
        'gfgtq4hnfb',
        'g2bhkvjj7v',
        'gj16hnvrcc',
        'gldfz6xhv6',
        'gt5p4jj5vf',
        'g86m4g68pf',
        'gkjlrkv7w7',
        'gt85sl4872',
        'gs6y3vtjnc',
        'gdfxz7nwqj',
        'gdywsqy1hn',
        'ggsytjnb1y',
        'g1kvxx2rfb',
        'gdmqrfnvqv',
        'gc6x5s5m82',
        'gvtfzf5l5b',
        'gfbtypnpdw',
        'ggggc8qccw',
        'gjp2487lqc',
        'gslrfnlyhk',
        'gqrklwt36y',
        'gmz9rnm4nr',
        'gb9tpkxxr8',
        'g3mbzr2yd9',
        'gqppnm9p17',
        'gfws5vlf5p',
        'gv8273mccp',
        'gxjhhl3gcq',
        'g11j2r29yy',
        'g3rg86syg4',
        'gbrzx11d6w',
        'gcy7xcsfmh',
        'g18fd3fkz7',
        'gmh3fqddfr',
        'gzk3frk3xn',
        'grm28h271h',
        'gnzlwhjtmt',
        'gskgvw71qc',
        'g3v9msh7nw',
        'gxtx278bxy',
        'gvy6rtlqjw',
        'gd47x7xml2',
        'g2b8prhdst',
        'gyw338zdb2',
        'ggn57hlr5h',
        'gj85l9bz8f',
        'g68km44z3x',
        'gfqmrndtmp',
        'gjrtqvfvnq',
        'g2w6zdlk3g',
        'gdswrgzpj9',
        'gbjzb6fsdg',
        'gc29dwvkwf',
        'gtrxk4rdx3',
        'gdrqxfk77z',
        'gmt5lhq386',
        'gnr77rznlb',
        'gdb666d6tn',
        'gp993dt2g5',
        'g5pvkkm2j7',
        'ghc468n2w6',
        'gw88pd6ndm',
        'gfsdbx2phl',
        'gmgrsq3y9w',
        'gdr5h7h7bw',
        'gt7z5v2c5f',
        'g7h7p7ml63',
        'gpdgs9x8gf',
        'glbzddnl65',
        'gflktsr823',
        'gfqhk35s4g',
        'g9gdrqlkxb',
        'gq2hs23kwq',
        'g1xlfjzpq1',
        'glds9nn9nk',
        'gjky5ykg5v',
        'gbhj1ss5xf',
        'gypdcfzwmy',
        'gw7t1n27tj',
        'gl7bmvxlg5',
        'gm3klc8qpf',
        'gnm46p6vrh',
        'gtjm9wytb8',
        'gwmkm22cjj',
        'gbg6998n5m',
        'g758zk3wbh',
        'g5pzxng41k',
        'g7tky6pwb5',
        'gjwd1bxmm7',
        'gz4jmcyh1g',
        'g3zk59t4df',
        'g621np1yjt',
        'g5v9pk3vxp',
        'gf9s1fxz7w',
        'g7kf49hvn7',
        'gkbt1xfg5y',
        'gs4b7b6klq',
        'gjqpsw7t3d',
        'g42mwp33fw',
        'ghddxl29qn',
        'gjs1gfqk6l',
        'gln63z227q',
        'gsl9199rl3',
        'gkqfw7hc7z',
        'gjzbxrgpjr',
        'grt8wrjzpy',
        'g6xrghlvfp',
        'gyzfpyj1sd',
        'gwjjj4j7yr',
        'gcf4cc14q6',
        'gxjlzrnskz',
        'g2c4h3mkrs',
        'gpmrrnv8gz',
        'g5mg72d47l',
        'gbb4mhclfw',
        'g7cnn65zv1',
        'gkr87d53sx',
        'g1p7y6mwm7',
        'gbfw1wdp2t',
        'g9md9ck7fr',
        'gfdw9bstxb',
        'gq8c6bz8vr',
        'ggm77clcgs',
        'gwqtr18wds',
        'gy1dxsv5b5',
        'grctcbdzk3',
        'gxcpks3f3x',
        'g4j8bj15lm',
        'g396k823k6',
        'g7l9t4zt9v',
        'g9269p5768',
        'gwzp48fmgt',
        'g8lwvn6frl',
        'gvcbwgc6sv',
        'gxfgcv33m4',
        'gbksczds97',
        'g66fyzw355',
        'gsj5hh9385',
        'gq8qbsvxyx',
        'gcd5lprysv',
        'g1ms7pxrb9',
        'gzdgyn7jxl',
        'g7mwmmghzd',
        'gmhw2jtyld',
        'gz776jgjmc',
        'g5z1cwl235',
        'gztxpxj5z7',
        'gdtzq37vn8',
        'glyzzvt99k',
        'gt3x8tv2g7',
        'gfpjnbhljl',
        'gjzgfp4zmq',
        'gwsxmfrlsc',
        'grg6wdqb4w',
        'gv2nyrkb6p',
        'g2qz8xn79f',
        'gpq556w4ql',
        'gsdplxkzm1',
        'gtzjkkdn5p',
        'gd7czdrhvy',
        'gpmrk9mqrl',
        'gk634cnwfx',
        'g3wjfbfbrz',
        'g878jyr8fx',
        'gmky9h51rh',
        'gfnflygdc7',
        'gnplr35rbv',
        'g5bk32ydr3',
        'gs79r46z2b',
        'gc5fcm3cnc',
        'gypctnh82j',
        'gh7ndhx8qk',
        'g35k647hwv',
        'gtkgh9y1z3',
        'g36kgglwvc',
        'g5qw15hdty',
        'gl1g5v83s3',
        'g56frxq75t',
        'gs87w38qxp',
        'gkqybpqnh6',
        'g3gzymjtsg',
        'g8gbh9vd28',
        'g37cxfvfxf',
        'gn971tdwht',
        'g1xl9z1fqt',
        'gly5v2nk3q',
        'gmrjxnbghx'
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
    page.render('screenshots/' + page.title + 'GID:' + playpenGID[i] + '.png');
}