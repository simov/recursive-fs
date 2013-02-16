
var fs = require('fs'),
    path = require('path');


var dirs = null, files = null;

exports.readdirr = function (dpath, cb) {
    dirs = [], files = [];
    dirs.push(dpath);
    function loop (index) {
        if (index == dirs.length) return cb(null, dirs, files);
        fs.readdir(dirs[index], function (err, _files) {
            if (err) return cb(err);
            getstat(dirs[index], _files, function (err) {
                if (err) return cb(err);
                loop(++index);
            });
        });
    }
    loop(0);
}

function getstat (dpath, _files, cb) {
    function loop (index) {
        if (index == _files.length) return cb();
        var fpath = path.join(dpath, _files[index]);
        fs.stat(fpath, function (err, stats) {
            if (err) return cb(err);
            if (stats.isDirectory()) {
                dirs.push(fpath);
            } else {
                files.push(fpath);
            }
            loop(++index);
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
