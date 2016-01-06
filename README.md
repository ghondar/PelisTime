# PelisTime
Un espacio multimedia basado en peerflix, React y empaquetado con electron.

![](img/logo.png)

## Setup
```shell
$ git clone https://github.com/ghondar/PelisTime.git
$ cd PelisTime
$ npm install
```

## If you want player binaries
create folder:
```shell
$ mkdir binVideo
```
you can download binaries from [Here](https://mega.nz/#F!0MYjBSoA!vYWKOf_Y4NeO8XABmv73QA),
and place the files zip in the folder

## Run

run webpack dev server:

```shell
$ npm run start-dev-server
```

and, in another terminal, run electron:

```shell
$ npm run start-dev
```

## Build and Package

build bundle.js:

```shell
$ npm run build
```

package project:

```shell
$ npm run pack
```

create installer on windows:

```shell
$ npm run installer:win
```

create installer on osx:

```shell
$ npm run installer:osx
```