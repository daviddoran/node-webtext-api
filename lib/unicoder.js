var iconv;

try {
    //Try requiring iconv package
    iconv = require('iconv');
} catch (e) {
    //It's okay if it fails - we might not need it
}

var Unicoder = {};

/**
 * Convert a UTF-8 string to WebText's hex-serialized UTF-16BE encoding
 */
Unicoder.encode = function (text) {
    //The iconv package may not have been installed (it's optional)
    if (!iconv) {
        throw new Error('The iconv package must be installed to send unicode messages.');
    }
    var converter = new iconv.Iconv('UTF-8', 'UTF-16BE');
    //Convert to UTF-16 (Big Endian)
    var utf16be = converter.convert(text);
    //Convert to hex
    return utf16be.toString('hex');
};

module.exports = Unicoder;
