# PelisTime
Un espacio multimedia basado en peerflix, Webchimera.js, React y empaquetado con electron.

![](icon/logo.png)

## Previus config
* the project only work on npm@2.x.x
```shell
$ sudo npm install -g npm@2.x.x
```

* if you want compile webchimera, more info [Here](https://github.com/RSATom/WebChimera.js)

## Setup
```shell
$ git clone https://github.com/ghondar/PelisTime.git
$ cd PelisTime
$ npm install
```

if you are on linux:

```shell
$ sudo apt-get install vlc
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

### Quick run: linux, osx or windows

```shell
$ npm run all:linux
```

```shell
$ npm run all:osx
```

```shell
$ npm run all:win
```

### Or step by step run

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
