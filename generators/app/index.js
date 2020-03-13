const fs = require('fs')
const { DateTime } = require('luxon')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Your project title (kebab-case)',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: 'This project needs a description',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author Name <email@example.com> (https://website.com)',
        store: true,
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: 'ISC',
        store: true,
      },
    ])
  }

  writing() {
    const { title } = this.answers
    const year = DateTime.local().year

    try {
      fs.mkdirSync(`./${title}`)
    } catch (err) {
      this.log(`'${title}' already exists. Exiting.`)
      process.exit(-1)
    }

    this.destinationRoot(`./${title}`)

    // Copy files.
    const files = [
      '.gitignore',
      '.prettierrc',
      '.eslintrc',
      'jest.config.js',
      'tsconfig.json',
      'webpack.config.js',
      '.babelrc',
      'src',
    ]
    files.forEach(v => this.fs.copy(this.templatePath(v), this.destinationPath(v)))

    // Copy templates with args.
    const templates = [
      ['package.json', { ...this.answers }],
      ['README.md', { title: this.answers.title, description: this.answers.description }],
      ['LICENSE.txt', { author: this.answers.author, year }],
    ]
    templates.forEach(v => this.fs.copyTpl(this.templatePath(v[0]), this.destinationPath(v[0]), v[1]))

    // Use this to track fixed versions of dependencies. Example:
    // this.fs.extendJSON(this.destinationPath('package.json'), {
    //   devDependencies: {
    //     eslint: '^3.15.0',
    //   },
    // })
  }

  install() {
    this.yarnInstall(
      [
        '@babel/cli',
        '@babel/core',
        '@babel/preset-env',
        '@types/jest',
        '@types/node',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'babel-preset-minify',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'jest',
        'pkg',
        'prettier',
        'ts-jest',
        'typescript',
        'webpack',
        'webpack-cli',
      ],
      { dev: true },
    )
    this.yarnInstall(['debug'])
  }
}
