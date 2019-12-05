# Whats in the Cache

Check whats in your cache

## Install

```
npm install whats-in-the-cache
```

## Usage

Add the package to your project and write a small build script.

```js
// check-cache.js
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

`getCacheInfo` takes 2 args

- `cacheDirectory` - where the cache directory lives
- `outputPath` (optional) - where the manifest of files in the cache will be written to

Then inside of your projects build steps, run the script on a pre or post build hook.

```json
{
  "name": "your-project",
  "scripts": {
    "build": "npm run xyz",
    "postbuild": "node check-cache.js"
  }
}
```

After the build is complete, download the built assets and inspect your cache manifest.

In netlify you can download the build with this icon

![image](https://user-images.githubusercontent.com/532272/70269557-7faf2600-1757-11ea-8a3b-4ce38ce6d6d2.png)
