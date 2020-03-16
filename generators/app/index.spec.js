const fs = require('fs')
const path = require('path')
const helpers = require('yeoman-test')
const rimraf = require('rimraf')

describe('generators:app', () => {
  let generator
  let originalError

  beforeEach(done => {
    // skipInstall: true generates warnings in console.error which are just informational.
    // So, we suppress those warnings here.
    originalError = console.error
    console.error = jest.fn()

    helpers.testDirectory(path.join(__dirname, 'temp'), () => {
      generator = helpers.createGenerator('ts-exe', ['../'], undefined, { skipInstall: true })
      done()
    })
  })

  afterEach(() => {
    console.error = jest.fn()

    rimraf.sync(path.join(__dirname, 'temp'))
  })

  it('generates expected files', async () => {
    helpers.mockPrompt(generator, {
      title: 'foo',
      description: '',
      author: 'Bar Baz',
      license: '',
    })

    await generator.run()

    const files = [
      '.gitignore',
      '.prettierrc',
      '.eslintrc',
      'jest.config.js',
      'tsconfig.json',
      'webpack.config.js',
      '.babelrc',
      'src/app.spec.ts',
      'src/app.ts',
      'src/index.ts',
      'package.json',
      'README.md',
    ]
    files.forEach(file => {
      expect(fs.existsSync(file)).toBe(true)
    })
  })
})
