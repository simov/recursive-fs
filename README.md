
#Recursive

##readdirr
```js
var path = require('path');
var recursive = require('recursive-fs');

var root = path.resolve(process.argv[2]);
recursive.readdirr(root, function (err, dirs, files) {
    if (err) {
        console.log(err);
    } else {
        console.log('DONE!');
    }
});
```

##rmdirr
```js
var path = require('path');
var recursive = require('recursive-fs');

var root = path.resolve(process.argv[2]);
recursive.rmdirr(root, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('DONE!');
    }
});
```

##Tests
```
$ mocha
```
