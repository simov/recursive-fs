
var t = require('assert').strict
var fs = require('fs')
var path = require('path')
var rfs = require('../')
var fixtures = require('./fixtures')


describe('promise', () => {
  var spath = path.join(__dirname, 'input')
  var tpath = path.join(__dirname, 'output')

  before(() => {
    fs.mkdirSync(spath)
    fixtures.dirs.forEach((fixture) => {
      fs.mkdirSync(path.join(spath, fixture))
    })
    fixtures.files.forEach((fixture) => {
      var fpath = path.join(spath, fixture)
      fs.writeFileSync(fpath, 'data', 'utf8')
    })
  })

  after(async () => {
    try {
      await rfs.remove(spath)
      await rfs.remove(tpath)
    }
    catch (err) {}
  })

  it('read', async () => {
    var {dirs, files} = await rfs.read(spath)
    t.equal(dirs.length, fixtures.dirs.length + 1)
    t.equal(files.length, fixtures.files.length)
  })

  it('copy', async () => {
    await rfs.copy(spath, tpath)
    var {dirs, files} = await rfs.read(tpath)
    t.equal(dirs.length, fixtures.dirs.length + 1)
    t.equal(files.length, fixtures.files.length)
  })
  it('copy directories', async () => {
    var {dirs} = await rfs.read(spath)
    await rfs.cpdirs(spath, tpath, dirs)
    var {dirs, files} = await rfs.read(tpath)
    t.equal(dirs.length, fixtures.dirs.length + 1)
  })
  it('copy files', async () => {
    var {files} = await rfs.read(spath)
    await rfs.cpfiles(spath, tpath, files)
    var {dirs, files} = await rfs.read(tpath)
    t.equal(files.length, fixtures.files.length)
  })

  it('remove', async () => {
    await rfs.remove(tpath)
    t.equal(fs.existsSync(tpath), false)
  })
  it('remove files', async () => {
    var {files} = await rfs.read(spath)
    await rfs.rmfiles(files)
    var {files} = await rfs.read(spath)
    t.equal(files.length, 0)
  })
  it('remove directories', async () => {
    var {dirs} = await rfs.read(spath)
    await rfs.rmdirs(dirs)
    t.equal(fs.existsSync(spath), false)
  })
})
