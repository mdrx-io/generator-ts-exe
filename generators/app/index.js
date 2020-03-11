const fs = require('fs')
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

    try {
      fs.mkdirSync(`./${title}`)
    } catch (err) {
      this.log(`'${title}' already exists. Exiting.`)
      process.exit(-1)
    }

    this.destinationRoot(`./${title}`)

    this.fs.copyTpl(this.templatePath('.gitignore'), this.destinationPath('.gitignore'))
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), { ...this.answers })
    this.fs.copyTpl(this.templatePath('.prettierrc'), this.destinationPath('.prettierrc'))
    this.fs.copyTpl(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'))
    this.fs.copyTpl(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'))
    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'))

    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        '@types/node': '^13.7.7',
        '@typescript-eslint/eslint-plugin': '^2.21.0',
        '@typescript-eslint/parser': '^2.21.0',
        eslint: '^6.8.0',
        'eslint-config-prettier': '^6.10.0',
        'eslint-plugin-prettier': '^3.1.2',
        prettier: '^1.19.1',
        typescript: '^3.8.2',
      },
    })
  }

  install() {
    this.yarnInstall()
  }
}
