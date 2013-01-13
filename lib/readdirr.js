
var fs = require('fs'),
    path = require('path');


var dirs = null, files = null;

exports.readdirr = function (dpath, cb) {
    dirs = [], files = [];
    dirs.push(dpath);
    function loop (i) {
        if (i == dirs.length) return cb(null, dirs, files);
        fs.readdir(dirs[i], function (err, filess) {
            if (err) return cb(err);
            getstat(dirs[i], filess, function (err) {
                if (err) return cb(err);
                loop(++i);
            });
        });
    }
    loop(0);
}

function getstat (dpath, filess, cb) {
    function loop (i) {
        if (i == filess.length) return cb();
        var fpath = path.join(dpath, filess[i]);
        fs.stat(fpath, function (err, stats) {
            if (err) return cb(err);
            if (stats.isDirectory()) {
                dirs.push(fpath);
            } else {
                files.push(fpath);
            }
            loop(++i);
        });
    }
    loop(0);
}

/*
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
*/
