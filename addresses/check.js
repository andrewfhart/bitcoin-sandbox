'use strict';

/**
 * Checks for transactions associated with an addr/pkey pair. Can
 * be used in conjunction with gen-1k.js to determine if a generated
 * address already has transactions on the blockchain.
 *
 * Usage: 
 *
 * node gen-1k.js | node check.js > results.txt
 *
 * or:
 *
 * node gen-1k.js > addresses.txt  (stores addrs & private keys)
 * node check.js < addresses.txt > results.txt
 * 
 **/

/*
 * Insight API Response format:
 * {
    "addrStr":"1QGkSBW2pZH9uRf8z7UMr1ByN3iPoUXPCf",
    "balance":0,
    "balanceSat":0,
    "totalReceived":0,
    "totalReceivedSat":0,
    "totalSent":0,
    "totalSentSat":0,
    "unconfirmedBalance":0,
    "unconfirmedBalanceSat":0,
    "unconfirmedTxApperances":0,
    "txApperances":0,
    "transactions":[]
    }
 *
 */
var readline = require('readline'),
    request = require('request-json');


 // Connection information
 var api = {
    server: 'http://insight.datafluency.com'
 };

 var run = function () {

    // Set up reading from command line
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    // Set up API client
    var client = request.newClient(api.server);

    // Process a line of input
    rl.on('line', function(line){
        var parts = line.split('\t');
        if (parts.length == 2) {
            client.get('/api/addr/' + parts[0], function (err, res, body) {

                if (err) console.log('Error: ' + err);

                console.log(parts[0] + ': ' + body.txApperances + ' Transactions');
                if (body.txAppearances > 0) {
                    console.log('[::HIT::] - ' + parts[1]);
                }
            });
        } else {
            console.log('Error: malformed input (' + line + ')');
        }
    });
 }

 module.exports.run = run;
 if (require.main === module) {
  run();
}
