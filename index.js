"use strict"
const path = require('path')

function getParentFolder() {
  const fileName = module.parent.filename
  return path.dirname(fileName)
}
  

function requiret(libraryPath) {
  const startTime = Date.now()


  if(libraryPath.startsWith('.')) {
    libraryPath = path.join(getParentFolder(), libraryPath)
  }

  const requiredLibrary = require(libraryPath)

  const totalTime = Date.now() - startTime
  this.times[libraryPath] = totalTime

  this.notifications && console.log(`Loading ${libraryPath}: ${totalTime}ms`)

  return requiredLibrary
}

let gulpRequireTimer = {
  times: {}, 
  notifications: true
}
gulpRequireTimer.require = requiret.bind(gulpRequireTimer)

module.exports = gulpRequireTimer


