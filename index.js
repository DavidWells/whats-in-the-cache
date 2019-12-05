const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdirP = promisify(fs.readdir)
const statP = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)

async function readDir(dir, allFiles = []) {
  const files = (await readdirP(dir)).map(f => path.join(dir, f))
  allFiles.push(...files)
  await Promise.all(
    files.map(
      async f => (await statP(f)).isDirectory() && readDir(f, allFiles)
    )
  )
  return allFiles
}

async function getCacheInfo(opts = {}) {
  if (!opts.cacheDirectory) {
    throw new Error('Must specify cacheDirectory to read')
  }
  let files
  try {
    // Recursively read all files in the cache directory
    files = await readDir(opts.cacheDirectory)
    console.log(`${files.length} cache-files`)
    // Write cache map into a file to download after build succeeds
    if (opts.outputPath) {
      await writeFile(opts.outputPath, JSON.stringify(files, null, 2))
      console.log(`Cached files map written to ${opts.outputPath}`)
      console.log('Download the build zip to access this file')
    }
  } catch (e) {
    console.log('err', e)
  }
  return files
}

module.exports = getCacheInfo
