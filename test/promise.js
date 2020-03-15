
var t = require('assert').strict
var fs = require('fs')
var path = require('path')
var recursive = require('../')
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
      await recursive.rmdirr(spath)
      await recursive.rmdirr(tpath)
    }
    catch (err) {}
  })

  it('readdirr', async () => {
    var {dirs, files} = await recursive.readdirr(spath)
    t.equal(dirs.length, fixtures.dirs.length + 1)
    t.equal(files.length, fixtures.files.length)
  })

  it('cpdirr', async () => {
    await recursive.cpdirr(spath, tpath)
    var {dirs, files} = await recursive.readdirr(tpath)
    t.equal(dirs.length, fixtures.dirs.length + 1)
    t.equal(files.length, fixtures.files.length)
  })

  it('copy directories', async () => {
    var {dirs} = await recursive.readdirr(spath)
    await recursive.cpdirs(spath, tpath, dirs)
    var {dirs, files} = await recursive.readdirr(tpath)
    t.equal(dirs.length, fixtures.dirs.length + 1)
  })
  it('copy files', async () => {
    var {files} = await recursive.readdirr(spath)
    await recursive.cpfiles(spath, tpath, files)
    var {dirs, files} = await recursive.readdirr(tpath)
    t.equal(files.length, fixtures.files.length)
  })

  it('rmdirr', async () => {
    await recursive.rmdirr(tpath)
    t.equal(fs.existsSync(tpath), false)
  })

  it('remove files', async () => {
    var {files} = await recursive.readdirr(spath)
    await recursive.rmfiles(files)
    var {files} = await recursive.readdirr(spath)
    t.equal(files.length, 0)
  })
  it('remove directories', async () => {
    var {dirs} = await recursive.readdirr(spath)
    await recursive.rmdirs(dirs)
    t.equal(fs.existsSync(spath), false)
  })
})
