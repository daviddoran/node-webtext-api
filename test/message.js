var assert = require('assert'),
    Message = require('../lib/message');

//Some pieces of test data
var NUMBER = '353861234567';
var NUMBERS = ['353861234567', '353862345678', '353863456789'];
var NUMBERS_STRING = NUMBERS.join(',');
var BODY = 'Message body...';

//The base options passed to most tests
var BASE = {to: NUMBERS, text: BODY};
//The base parameters expected out of most serializations
var EXPECTBASE = {dest: NUMBERS_STRING, txt: BODY, receipt: 0};

//Extend obj with properties from other
//Returns a new object
function extend(obj, other) {
    var result = {};
    for (var prop in obj) {
        result[prop] = obj[prop];
    }
    for (var prop in other) {
        result[prop] = other[prop];
    }
    return result;
}

//Returns an object with options added to BASE
var base = function (options) {
    return extend(BASE, options || {});
};

//Returns an object with options added to EXPECTBASE
var expbase = function (options) {
    return extend(EXPECTBASE, options || {});
};

describe('Message', function () {
    describe('#constructor()', function () {
        it('should require only a recipient and text body', function () {
            var m = new Message({to: NUMBER, text: BODY});
            assert.deepEqual(
                m.serialize(),
                {dest: NUMBER, txt: BODY, receipt: 0}
            );
        });
        it('should support multiple recipients', function () {
            var m = new Message(BASE);
            assert.deepEqual(
                m.serialize(),
                EXPECTBASE
            );
        });

        //Sender tag
        it('should support a (sender) tag', function () {
            var expected = expbase({tag: 'Alerts'});
            var m = new Message(base({tag: 'Alerts'}));
            assert.deepEqual(m.serialize(), expected);
            var m2 = new Message(base({from: 'Alerts'}));
            assert.deepEqual(m2.serialize(), expected);
        });
        it('should disallow a tag longer than 11 characters', function () {
            assert.throws(function () {
                new Message(base({from: '123456789012'}));
            }, Error);
        });

        //Text body and unicode
        it('should accept either a text or unicode body', function () {
            //Fails if neither text or unicode supplied
            assert.throws(function () {
                new Message({to: NUMBERS});
            }, Error, '');
            //Fails if both text and unicode supplied
            assert.throws(function () {
                new Message({to: NUMBERS, text: 'Text', unicode: 'Unicode'});
            }, Error, '');
        });

        //Delivery date and time
        it('should accept a delivery time', function () {
            var date = new Date(Date.UTC(2016, 11, 14, 13, 5));
            var expected = expbase({delivery_time: '201612141305'});
            var m = new Message(base({delivery_time: date}));
            assert.deepEqual(m.serialize(), expected);
        });

        //Delivery delta (minutes in the future)
        it('should accept a delivery delta', function () {
            var expected = expbase({delivery_delta: 45});
            var m = new Message(base({delivery_delta: 45}));
            assert.deepEqual(m.serialize(), expected);
        });

        //Receipt types (none, URL, email)
        it('should support URL receipts', function () {
            var expected = expbase({receipt: Message.Receipt.URL, receipt_url: 'http://example.com/'});
            var m = new Message(base({url: 'http://example.com/'}));
            assert.deepEqual(m.serialize(), expected);
        });

        //Only one of URL or email receipts can be used
        it('should not allow both URL and email receipts', function () {
            assert.throws(function () {
                new Message(base({url: 'http://example.com/', email: 'hi@example.com'}));
            });
        });

        //Message IDs
        it('should allow a numeric message id to be supplied', function () {
            //Accept numeric id supplied as a number
            var expected = expbase({msgid: 1234567});
            var m = new Message(base({id: 1234567}));
            assert.deepEqual(m.serialize(), expected);
            //Accept numeric id supplied as a string
            var expected2 = expbase({msgid: 1234567});
            var m2 = new Message(base({id: '1234567'}));
            assert.deepEqual(m2.serialize(), expected2);
        });
        it('should reject non-numeric message ids', function () {
            //Reject non-numeric ids
            assert.throws(function () {
                new Message(base({id: 'abc'}));
            });
        });
    });
});
