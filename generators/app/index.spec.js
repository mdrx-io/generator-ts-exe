const fs = require('fs')
const path = require('path')
const helpers = require('yeoman-test')
const rimraf = require('rimraf')
const commandExistsSync = require('command-exists')

describe('generators:app', () => {
  let generator
  let originalError

  beforeEach((done) => {
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

  it('generates a project directory', async () => {
    const oldExit = process.exit
    process.exit = jest.fn()

    const title = 'foo'

    helpers.mockPrompt(generator, {
      title,
      description: '',
      author: 'Bar Baz',
      license: '',
    })

    await generator.run()

    expect(process.exit).not.toHaveBeenCalled()

    process.exit = oldExit
  })

  it('fails if directory exists', async () => {
    const oldExit = process.exit
    process.exit = jest.fn()

    const title = 'foo'

    helpers.mockPrompt(generator, {
      title,
      description: '',
      author: 'Bar Baz',
      license: '',
    })

    fs.mkdirSync(path.join(__dirname, 'temp', title))

    await generator.run()

    expect(process.exit).toHaveBeenCalled()

    process.exit = oldExit
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
    files.forEach((file) => {
      expect(fs.existsSync(file)).toBe(true)
    })
  })

  it('uses yarn by default', async () => {
    jest.resetAllMocks()

    helpers.mockPrompt(generator, {
      title: 'foo',
      description: '',
      author: 'Bar Baz',
      license: '',
    })

    commandExistsSync.sync.mockReturnValueOnce(true)

    generator.yarnInstall = jest.fn()
    generator.npmInstall = jest.fn()

    await generator.run()

    expect(commandExistsSync.sync).toHaveBeenCalledTimes(1)
    expect(generator.yarnInstall).toHaveBeenCalledTimes(2)
    expect(generator.npmInstall).not.toHaveBeenCalled()
  })

  it('falls back to npm if yarn is not detected', async () => {
    jest.resetAllMocks()

    helpers.mockPrompt(generator, {
      title: 'foo',
      description: '',
      author: 'Bar Baz',
      license: '',
    })

    commandExistsSync.sync.mockReturnValueOnce(false)

    generator.yarnInstall = jest.fn()
    generator.npmInstall = jest.fn()

    await generator.run()

    expect(commandExistsSync.sync).toHaveBeenCalledTimes(1)
    expect(generator.yarnInstall).not.toHaveBeenCalled()
    expect(generator.npmInstall).toHaveBeenCalledTimes(2)
  })
})
