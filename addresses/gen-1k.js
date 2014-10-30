'use strict';

/**
 * Generate 1000 Bitcoin addresses and private keys, and output them
 * in the format:
 * 
 * <addr>\t<pkey>\n
 * 
 * Usage:
 *
 * node gen-1k.js > addresses.txt
 */


var run = function() {
  var bitcore = require('bitcore');
  var Key = bitcore.Key;
  var Address = bitcore.Address;

  var a, k;
  var c = 1000, i = 0;
  while (i < c) {
    k = Key.generateSync();
    a = Address.fromKey(k);
    i++;
    console.log(a.toString() + "\t" + k.private.toString('hex'));
  }
};

module.exports.run = run;
if (require.main === module) {
  run();
}
