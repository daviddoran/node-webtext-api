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

### Send an SMS message

See the [Sending Messages](#sending-sms) section below for details.

```javascript
wt.send({
    text: 'First message from WebText!',
    to: '353861234567'
}, function (err) {
    if (!err) console.log('Message sent successfully!');
});
```

### Check account balance

```javascript
wt.balance(function (err, balance) {
    if (!err) console.log('Account has ' + balance + ' credits');
});
```

### Add a contact

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

### Remove a contact

```javascript
wt.contacts.remove('353861234567');
```

Just remove the contact from a group:

```javascript
wt.contacts.remove('353861234567', {
    group: '888729566'
});
```

### Add a contact group

```javascript
wt.groups.save('Customers', function (err, group) {
    console.log('Group alias: ' + group);
});
```

### Remove a contact group

```javascript
wt.groups.remove('888729566');
```

## License

This project is released under the MIT License.
