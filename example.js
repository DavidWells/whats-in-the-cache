const path = require('path')
const getCacheInfo = require('whats-in-the-cache')

// Run the stuff
const MY_BUILD_DIR = path.resolve('build')
const NETLIFY_CACHE_DIR = '/opt/build/cache'
const OUTPUT_PATH = path.join(MY_BUILD_DIR, 'cache-output.json')

getCacheInfo({
  cacheDirectory: NETLIFY_CACHE_DIR,
  outputPath: OUTPUT_PATH,
}).then(() => {
  console.log(`Cached file information saved to ${OUTPUT_PATH}`)
}).catch((e) => {
  console.log(e)
})
