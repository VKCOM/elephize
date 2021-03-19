# Elephize

Library and tool for transpiling limited set of React & Typescript constructions into PHP for use in server-side rendering.

### Документация

- [Использование CLI](doc/usage-cli.md)
- [Модульная структура транспилируемого кода](doc/modules.md)
- [Поддержка синтаксиса и стандартной библиотеки](doc/support.md)
- [Unused code elimination](doc/code-elimination.md)

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

### Contributing

Source files are located in `src/` folder. Also there are generated files for distribution (`dist/`) and demo files is separate `demo/` folder. Before making a commit, you should ensure all the files are in sync with originals using command `yarn sniff` - this also will run unit tests and code style checks.

Separate commands for debugging are available:
- `yarn lint`: run codestyle checks only
- `yarn test`: run unit tests of the library WITHOUT server-side rendering compliance test
- `yarn test_all`: run ALL unit tests. This will also build dist & demo as dependencies for SSR compliance test.
- `yarn build`: compile dist files
- `yarn demo_build`: compile all demo files
- `yarn demo_genjs`: compile client-side bundle for demo
- `yarn demo_genphp`: compile demo files from js to php
- `yarn demo_outreact`: print react-server output to stdout (without running server, may be useful for debugging)
- `yarn demo_outphp`: print php output to stdout (without running server, may be useful for debugging)

Use `VERBOSE=true` environment setting to print out detailed messages from transpiler.
