const fs = require('fs')
const path = require('path')
const helpers = require('yeoman-test')

describe('generators:app', () => {
  let generator

  beforeEach(() => {
    helpers.run(path.join(__dirname, '../app')).inTmpDir(function(dir) {
      var done = this.async() // `this` is the RunContext object.
      fs.copy(path.join(__dirname, '../templates/common'), dir, done)
    })
  })

  it('generates a project', () => {
    helpers.mockPrompt(generator, {
      title: 'foo',
      description: '',
      author: 'Bar Baz',
      license: '',
    })

    generator.run().then(() => {
      assert.file([
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.travis.yml',
        'index.js',
        'index.html',
        'index.css',
        'license',
        'package.json',
        'readme.md',
      ])
    })
  })
})
