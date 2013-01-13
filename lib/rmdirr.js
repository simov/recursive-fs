
var fs = require('fs');
var readdirr = require('./readdirr').readdirr;


exports.rmdirr = function (dpath, cb) {
    readdirr(dpath, function (err, dirs, files) {
        if (err) return cb(err);
        rmfiles(files, function (err) {
            if (err) return cb(err);
            rmdirs(dirs, cb);
        });
    });
    var func = null,
        list = null;
    function rmfiles (files, cb) {
        func = 'unlink';
        list = files;
        loop(0, cb);
    }
    function rmdirs (dirs, cb) {
        func = 'rmdir';
        list = dirs.sort(desc);
        loop(0, cb);
    }
    function loop (index, cb) {
        if (index == list.length) return cb();
        fs[func](list[index], function (err) {
            if (err) return cb(err);
            loop(++index, cb);
        });
    }
}

function desc(a, b) {
    if (a > b) return -1;
    if (a < b) return  1;
    return 0;
}

/*
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
*/
