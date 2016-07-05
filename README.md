# PelisTime
Un espacio multimedia basado en peerflix, Webchimera.js, React y empaquetado con electron.

http://i.giphy.com/26FPIiWbFzMWMP90Q.gif


## Previus config
if you want compile webchimera, more info [Here](https://github.com/RSATom/WebChimera.js)

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

#### Build output
```
./tmp/...
```
