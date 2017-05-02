# quark

A minimalist Webkit browser built on [Electron](http://electron.atom.io/)


## Building

This is nowhere near stable yet, but if you want to build it to hack on it, it's quite simple with yarn/npm.

```bash
yarn --dev # or npm install --dev
./node_modules/electron/dist/electron .
```

You can also run with a global install of `electron`:

```bash
yarn global add electron
yarn
electron .
```
