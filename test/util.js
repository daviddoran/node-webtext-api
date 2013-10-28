var assert = require('assert'),
    Util = require('../lib/util');

describe('Util', function () {
    describe('#noop()', function () {
        it('should be callable', function () {
            assert.equal(void 0, Util.noop());
        });
        it('should accept any number of arguments', function () {
            assert.equal(void 0, Util.noop(1, 2, 3));
        });
    });
    describe('#WebTextError', function () {
        it('should be an Error', function () {
            var error = new Util.WebTextError('Authentication Failure', 201);
            assert.ok(error instanceof Error);
        });
    });
});
