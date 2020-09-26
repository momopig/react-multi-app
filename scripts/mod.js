const webpack = require('webpack')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const createModConfig = require('../config/webpack.mod.conf');


const mods = process.argv.splice(2)
mods.forEach(modName => {
  let config = createModConfig(modName)

  let spinner = new Spinner(`${modName} building: `)
  spinner.start()

  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(chalk.red(`× ${modName} build failed with errors.\n`))
      console.log(stats.toString())
      process.exit()
    }


    spinner.stop()

    console.log('\n')
    console.log(chalk.cyan(`√ ${modName} build complete.\n`))
    console.log(
      chalk.yellow(
        '  Module should be loaded by base project.\n'
      )
    )
  })
})
