/**
 * Generate a Bitcoin address using a "brain wallet" and the 
 * Bitcore API.
 * 
 * See inline comments for details about what is going on in 
 * each step
 *
**/

// Load/include the bitcore library
var bitcore = require('bitcore');

// This is the "brain wallet" passphrase, it is supposed to be
// something extremely unique and hard for anyone else to 
// guess. If someone were to guess it (or to independently
// choose the same phrase, that person would also be able to 
// access any stored value associated with the wallet. Generally
// speaking, its often better to rely on true crypto when 
// generating a password for your private key to ensure you're 
// getting something as close as possible to true randomness.
var password = 'worst brain wallet phrase ever';

// The private key is obtained by taking the SHA256 hash of the 
// password.
var privkey = bitcore.util.sha256(password);

// Bitcore provides a "Key" abstraction, which can be loaded up
// with the private key we just created.
var key = new bitcore.Key;
key.private = privkey;

// In Bitcoin, everything can be derived from the private key. So,
// Since we've created a Key object and loaded it up with our 
// private key, we can simply call the Key object's regenerateSync
// function to derive the public key (note public key != public address:
// the public address is different and will be derived in a later step).
key.regenerateSync();

// Now that the public key has been generated, we can start the 
// process of generating a public Bitcoin address for the key. The 
// first step is taking a combination of the SHA256 and RIPEMD160 
// hashes of the public key. Bitcore conveniently provides these
// operations as a single API function
var hash = bitcore.util.sha256ripe160(key.public)

// Then, depending on which network ('livenet' or 'testnet') we wish
// to target, we need to include the correct version number. Bitcore
// stores all of the necessary network metadata in bitcore.networks
var version = bitcore.networks['livenet'].addressVersion

// We can pass the hash and the version number to bitcore's Address
// abstraction, which will expose a few handy methods to us and hide
// the tedious details of formatting the address in various ways
var address = new bitcore.Address(version, hash)

// Finally, lets see what we've done
console.log("Private Key:\t" + bitcore.util.formatBuffer(key.private, 256));
console.log("Public Key:\t" + bitcore.util.formatBuffer(key.public,160));
console.log("Public Address:\t" + address.toString());

// Compare this output with the results given by https://www.bitaddress.org
// to see that this does, in fact, generate a valid Bitcoin address.
