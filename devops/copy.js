const shell = require('shelljs')

shell.rm('-Rf', 'prod')
shell.mkdir('prod')
shell.mkdir('prod/shared')
shell.cp('-R', '.nuxt', 'prod/.nuxt')
shell.cp('-R', 'package.json', 'prod/package.json')
shell.cp('-R', 'nuxt.config.js', 'prod/nuxt.config.js')
shell.cp('-R', 'shared/config', 'prod/shared/config')
shell.cp('-R', 'static', 'prod/static')
