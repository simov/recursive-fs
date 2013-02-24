
var fs = require('fs'),
    path = require('path');
var recursive = require('../'),
    fixtures = require('./fixtures');


describe('recursive', function () {
    var spath = '',
        tpath = '';
    before(function (done) {
        spath = path.join(__dirname, 'test');
        tpath = path.join(__dirname, 'output');
        fs.mkdir(spath, function (err) {
            if (err) return done(err);
            for (var i=0; i < fixtures.dirs.length; i++) {
                fs.mkdirSync(path.join(spath, fixtures.dirs[i]));
            }
            for (var i=0; i < fixtures.files.length; i++) {
                var fpath = path.join(spath, fixtures.files[i]);
                fs.writeFileSync(fpath, 'data', 'utf8');
            }
            done();
        });
    });
    
    describe('read', function () {
        it('directory', function (done) {
            recursive.readdirr(spath, function (err, dirs, files) {
                if (err) return done(err);
                dirs.length.should.equal(fixtures.dirs.length+1);
                files.length.should.equal(fixtures.files.length);
                done();
            });
        });
    });

    describe('copy', function () {
        it('directory', function (done) {
            recursive.cpdirr(spath, tpath, function (err) {
                if (err) return done(err);
                recursive.readdirr(tpath, function (err, dirs, files) {
                    if (err) return done(err);
                    dirs.length.should.equal(fixtures.dirs.length+1);
                    files.length.should.equal(fixtures.files.length);
                    done();
                });
            });
        });
        after(function (done) {
            recursive.rmdirr(tpath, function (err) {
                if (err) return done(err);
                done();
            });
        });
    });
    
    describe('copy', function () {
        it('list of directories', function (done) {
            recursive.readdirr(spath, function (err, dirs, files) {
                if (err) return done(err);
                recursive.cpdirs(spath, tpath, dirs, function (err) {
                    if (err) return done(err);
                    recursive.readdirr(tpath, function (err, dirs, files) {
                        if (err) return done(err);
                        dirs.length.should.equal(fixtures.dirs.length+1);
                        done();
                    });
                });
            });
        });
        it('list of files', function (done) {
            recursive.readdirr(spath, function (err, dirs, files) {
                if (err) return done(err);
                recursive.cpfiles(spath, tpath, files, function (err) {
                    if (err) return done(err);
                    recursive.readdirr(tpath, function (err, dirs, files) {
                        if (err) return done(err);
                        files.length.should.equal(fixtures.files.length);
                        done();
                    });
                });
            });
        });
    });
    
    describe('remove', function () {
        it('directory', function (done) {
            recursive.rmdirr(tpath, function (err) {
                if (err) return done(err);
                fs.exists(tpath, function (exists) {
                    exists.should.equal(false);
                    done();
                });
            });
        });
    });

    describe('remove', function () {
        it('list of files', function (done) {
            recursive.readdirr(spath, function (err, dirs, files) {
                if (err) return done(err);
                recursive.rmfiles(files, function (err) {
                    if (err) return done(err);
                    recursive.readdirr(spath, function (err, dirs, files) {
                        if (err) return done(err);
                        files.length.should.equal(0);
                        done();
                    });
                });
            });
        });
        it('list of directories', function (done) {
            recursive.readdirr(spath, function (err, dirs, files) {
                if (err) return done(err);
                recursive.rmdirs(dirs, function (err) {
                    if (err) return done(err);
                    fs.exists(spath, function (exists) {
                        exists.should.equal(false);
                        done();
                    });
                });
            });
        });
    });
});
