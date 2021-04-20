# Elephize

Library and tool for transpiling limited set of React & Typescript constructions into PHP for use in server-side rendering.

### Usage

**NPM**:

`npm install -D @vkontakte/elephize`
or
`yarn add -D @vkontakte/elephize`

Check error messages for peerDependencies errors, as elephize requires typescript to work.

**Play with lib and demo (github)**:

`git clone https://github.com/VKCOM/elephize.git`

`cd elephize && yarn`

`yarn demo_start`

This will set up demo files in demo/public folder and run two servers:
- React node server with native ReactDOM on port 3000
- Php simple server with transpiled sources on port 8000

To see help, use `bin/elephize --help` or `./node_modules/.bin/elephize --help` if you've installed elephize as a module. 

### Documentation (ru)

- [Использование CLI](doc/usage-cli.md)
- [Модульная структура транспилируемого кода](doc/modules.md)
- [Поддержка синтаксиса и стандартной библиотеки](doc/support.md)
- [Unused code elimination](doc/code-elimination.md)
- [Руководство разработчика elephize: рабочий процесс](doc/contributor-guide/basic-workflow.md)
- [Руководство разработчика elephize: архитектура](doc/contributor-guide/basic-architecture.md)
- [Руководство разработчика elephize: UCE](doc/contributor-guide/unused-code-elimination.md)

### Documentation (en)

Help wanted! If you have time to translate docs to english, please feel free to send us your PRs.
