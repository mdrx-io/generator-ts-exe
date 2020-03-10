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

    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('./package.json'), {
      title: this.answers.title,
      description: this.answers.description,
      author: this.answers.author,
      license: this.answers.license,
    })
  }
}
