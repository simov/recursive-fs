
var fs = require('fs'),
    path = require('path');
var readdirr = require('./readdirr').readdirr;


/**
 * Copy directory recursively.
 *
 * @param {String} source path
 * @param {String} target path
 * @param {Function} callback
 * @api public
 */

exports.cpdirr = function (spath, tpath, cb) {
    readdirr(spath, function (err, dirs, files) {
        if (err) return cb(err);
        dirs.sort();
        createDirs(spath, tpath, dirs, function (err) {
            if (err) return cb(err);
            createFiles(spath, tpath, files, function (err) {
                if (err) return cb(err);
                cb();
            });
        });
    });
}

/**
 * Create all directories.
 *
 * @param {String} source path
 * @param {String} target path
 * @param {Array} dir paths
 * @param {Function} callback
 * @api private
 */

function createDirs (spath, tpath, dirs, cb) {
    (function loop (index) {
        if (index == dirs.length) return cb();
        var rpath = path.relative(spath, dirs[index]);
        rpath = path.join(tpath, rpath);
        fs.mkdir(rpath, function (err) {
            if (err) return cb(err);
            loop(++index);
        });
    }(0));
}

/**
 * Create all files.
 *
 * @param {String} source path
 * @param {String} target path
 * @param {Array} file paths
 * @param {Function} callback
 * @api private
 */

function createFiles (spath, tpath, files, cb) {
    (function loop (index) {
        if (index == files.length) return cb();
        fs.readFile(files[index], function (err, data) {
            if (err) return cb(err);
            var rpath = path.relative(spath, files[index]);
            rpath = path.join(tpath, rpath);
            fs.writeFile(rpath, data, function (err) {
                if (err) return cb(err);
                loop(++index);
            });
        });
    }(0));
}

/*
    // cpdirr example
    
    var path = require('path');
    var recursive = require('recursive-fs');

    var spath = path.resolve(process.argv[2]),
        tpath = path.resolve(process.argv[3]);
    recursive.cpdirr(spath, tpath, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('DONE!');
        }
    });
*/
