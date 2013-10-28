# Node.js WebText.com API Client

Send messages, check account balance, and manage contacts on WebText.com.

## Installation

The following will install this package and add it as a dependency to your project:

    npm install --save

## Usage

Require this package after installing with npm:

```javascript
var WebText = require('webtext-api');
```

Create a WebText object with your API User and Password:

```javascript
var user = 'bw13cexH',
    password = '5yw8Vhc3';

var wt = new WebText(user, password);
```

Now you can call the various API methods.

#### Send an SMS message

See the [Sending Messages](#sending-messages) section below for details.

```javascript
wt.send({
    text: 'First message from WebText!',
    to: '353861234567'
}, function (err) {
    if (!err) console.log('Message sent successfully!');
});
```

#### Check account balance

```javascript
wt.balance(function (err, balance) {
    if (!err) console.log('Account has ' + balance + ' credits');
});
```

#### Add a contact

```javascript
wt.contacts.save('353861234567', {
    name: 'David Doran'
});
```

Add the contact to a group:

```javascript
wt.contacts.save('353861234567', {
    group: '888392630'
});
```

#### Remove a contact

```javascript
wt.contacts.remove('353861234567');
```

Just remove the contact from a group:

```javascript
wt.contacts.remove('353861234567', {
    group: '888729566'
});
```

#### Add a contact group

```javascript
wt.groups.save('Customers', function (err, group) {
    console.log('Group alias: ' + group);
});
```

#### Remove a contact group

```javascript
wt.groups.remove('888729566');
```

## Sending Messages

The following message will be delivered 20 minutes from now, to group 888392630, with sender '\*Alerts\*', with the id '12345', and receipts will be delivered to 'webtext-receipts@example.com'.

```javascript
var message = new WebText.Message({
    to: '888392630',
    from: '*Alerts*',
    text: 'This is an example SMS message',
    id: 12345,
    email: 'webtext-receipts@example.com',
    delivery_delta: 20
});

wt.send(message);
```

Here is the full list of supported properties with examples:

**Required:** `to` is a phone number, array of phone numbers, or an array of group aliases.
```javascript
{to: ['353863123456', '353863654321', '353861940728']}
```

**Required:** `text` is the text of the message.
```javascript
{text: 'Thanks for subscribing to SMS alerts!'}
```

`unicode` is the unicode text of the message (either `text` or `unicode` must be given).
```javascript
{unicode: 'Μιλάς Ελληνικά'}
```

`tag` (or `from`) is the name that will appear as the message sender.
```javascript
{tag: 'Alerts System'}
```

`id` is a unique numeric id for the message.
```javascript
{id: '201300001'}
```

`url` is the URL to which message receipts should be sent.
```javascript
{url: 'https://example.com/webtext-receipts'}
```

`email` is the email address to which message receipts should be sent.
```javascript
{email: 'webtext-receipts@example.com'}
```

`delivery_time` is the date when the message should be sent, given by a `Date` object.
```javascript
//Send the message on the 15th of January 2016
{delivery_time: new Date('2016-01-15 18:00:00')}
```

`delivery_delta` is the number of minutes to wait before sending the message.
```javascript
//Send the message 10 minutes from now
{delivery_delta: 10}
```

`validity` is the number of minutes the SMS is valid for (after which delivery will not be attempted).
```javascript
//Message is valid for 5 hours
{validity: 300}
```

## License

This project is released under the MIT License.
