var assert = require('assert'),
    unicoder = require('../lib/unicoder');

describe('Unicoder', function () {
    describe('#encode()', function () {
        it('should handle empty input', function () {
            assert.equal('', unicoder.encode(''));
        });
        it('should encode strings to UTF-16BE hex', function () {
            assert.equal('004100420043', unicoder.encode('ABC'));
            assert.equal('00480065006c006c006f', unicoder.encode('Hello'));
            assert.equal('00480065006c006c006f00200057006f0072006c0064', unicoder.encode('Hello World'));
        });
    });
});
