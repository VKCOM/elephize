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

You can use `debugger;` statement in your ts code to debug transpilation process and check context variables. When run with
node debugger, this statement will pause the execution process when source file transpilation reaches the statement.
It's useful to combine it with manual breakpoints to check particular cases.

### Documentation (ru)

- [Использование CLI](doc/usage-cli.md)
- [Модульная структура транспилируемого кода](doc/modules.md)
- [Поддержка синтаксиса и стандартной библиотеки](doc/support.md)

#### Описание проекта
- [Мотивация и ответы на вопросы](doc/project-description/motivation.md)
- [Ограничения и возможности](doc/project-description/restrictions-and-opportunities.md)
- [Базовые сведения о транспиляции](doc/project-description/transpilation-basics.md)
- [Транспиляция базового синтаксиса](doc/project-description/basic-syntax.md)
- [Функции и области видимости](doc/project-description/functions-and-visibility.md)
- [Уничтожение неиспользуемого кода](doc/project-description/unused-code-elimination.md)
- [Обзор архитектуры библиотеки](doc/project-description/basic-architecture.md)
- [Обзор рабочего процесса разработки](doc/project-description/basic-workflow.md)

### Documentation (en)

Help wanted! If you have time to translate docs to english, please feel free to send us your PRs.
