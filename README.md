# gulp-next

### How to use?

- `npm start` ==> Start project with server
- `npm run build` ==> Release bundled codes to /build

- `gulp [task] --release` ==> Production mode
- `gulp build` ==> build sources to destination
- `gulp server` ==> start browser-sync as server
- ...

### Directories & Files

#### /build
Release assets

#### /dist
Development assets

#### /config
Global configuration

#### /src
The source code directory.

#### /tasks

`[number].[name].js`

The running order of gulp tasks according to their prefix number.

First off all tasks were loaded automatically, so if you want to control them to run well, their order is important, such as build should is later than other content tasks on the best.

These Tasks that begin with '0' are content related, with '1' are tools tasks.

#### /tools
