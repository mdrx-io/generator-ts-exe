const fs = require('fs')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Your project title (kabob-case)',
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
    try {
      fs.mkdirSync(`./${this.answers.title}`)
    } catch (err) {
      this.log(`'${this.answers.title}' already exists. Exiting.`)
      process.exit(-1)
    }

    this.destinationRoot(`./${this.answers.title}`)

    this.fs.copyTpl(this.templatePath('.gitignore'), this.destinationPath('./.gitignore'))
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('./package.json'), {
      title: this.answers.title,
      description: this.answers.description,
      author: this.answers.author,
      license: this.answers.license,
    })
    this.fs.copyTpl(this.templatePath('.prettierrc'), this.destinationPath('./.prettierrc'))
    this.fs.copyTpl(this.templatePath('.eslintrc'), this.destinationPath('./.eslintrc'))

    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        eslint: '^6.8.0',
        'eslint-config-prettier': '^6.10.0',
        'eslint-plugin-prettier': '^3.1.2',
        prettier: '^1.19.1',
      },
    })
  }

  install() {
    this.yarnInstall()
  }
}
