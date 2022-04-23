### Prerequisites

To start developing you will need:
- git
- node 12+
- npm or yarn
- php 7.1+
- *nix-base host machine.

windows users may try WSL, though elephize build scripts are not really ever been tested on it.

If you don't have `yarn` installed, you may use `npm` as well. If you change anything
regarding running scripts via package.json, please use `yon` command in there.

### Quick start

`git clone https://github.com/VKCOM/elephize.git`
`cd elephize`
`npm i`
`npm demo_start`

This will start php development server on port 8000 and node server on port 3000. You should see similar results on those locations.

### Commands

Separate commands for debugging and running checks are available:
- `yarn lint`: run codestyle checks only
- `yarn test`: run unit tests of the library WITHOUT server-side rendering compliance test
- `yarn test_all`: run ALL unit tests. This will also build dist & demo as dependencies for SSR compliance test.
- `yarn build`: compile dist files
- `yarn demo_build`: compile all demo files
- `yarn demo_genjs`: compile client-side bundle for demo
- `yarn demo_genphp`: compile demo files from js to php
- `yarn demo_outreact`: print react-server output to stdout (without running server, may be useful for debugging)
- `yarn demo_outphp`: print php output to stdout (without running server, may be useful for debugging)

If you want more verbosity in transpiler output you may also use next `.elephizerc` options:
- `verbose` to output information logs
- `verboseTypehints` to output type inference logs
- `verboseUsage` to output unused code elimination logs

`.elephizerc` file for demo project is located right in the `demo` folder.

### Contributing

Next sequence is required to create a pull request:
- Create a branch in your local repo
- Commit all your changes. Please use commit messages that clearly describe what changes have been made and why.
- Run `yarn sniff` command to run all checks. If necessary, update test specimens by running `yarn run _update_test_specimens`.
- If all checks are passed, use `git push` to publish your changes.
- Create a pull-request and wait for CI checks to pass.
- When all checks are passed and code is good enough, it will be merged and published to npm by the repo administrators.

