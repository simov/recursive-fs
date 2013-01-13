
var fs = require('fs'),
    path = require('path');
var recursive = require('../'),
    fixtures = require('./fixtures');


describe('recursive', function () {
    var dpath = null;
    before(function (done) {
        dpath = path.join(__dirname, 'test');
        fs.mkdir(dpath, function (err) {
            if (err) return done(err);
            for (var i=0; i < fixtures.dirs.length; i++) {
                fs.mkdirSync(path.join(dpath, fixtures.dirs[i]));
            }
            for (var i=0; i < fixtures.files.length; i++) {
                var fpath = path.join(dpath, fixtures.files[i]);
                fs.writeFileSync(fpath, 'data', 'utf8');
            }
            done();
        });
    });
    
    it('should read directory', function (done) {
        recursive.readdirr(dpath, function (err, dirs, files) {
            if (err) return done(err);
            dirs.length.should.equal(fixtures.dirs.length+1);
            files.length.should.equal(fixtures.files.length);
            done();
        });
    });

    it('should remove directory', function (done) {
        recursive.rmdirr(dpath, function (err) {
            if (err) return done(err);
            fs.exists(dpath, function (exists) {
                exists.should.equal(false);
                done();
            });
        });
    });
});
