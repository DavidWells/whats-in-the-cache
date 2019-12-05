# Whats in the Cache

Check whats in your cache

## Install

```
npm install whats-in-the-cache
```

## Usage

```js
const path = require('path')
const getCacheInfo = require('whats-in-the-cache')

const MY_BUILD_DIR = path.resolve('build')
const NETLIFY_CACHE_DIR = '/opt/build/cache'
const OUTPUT_PATH = path.join(MY_BUILD_DIR, 'cache-output.json')

getCacheInfo({
  cacheDirectory: NETLIFY_CACHE_DIR,
  outputPath: OUTPUT_PATH,
}).then((files) => {
  console.log('files', files)
}).catch((e) => {
  console.log(e)
})
```
