"use strict"
//this tests all of the functionality of gulp-require-timer

const expect = require('chai').expect

let requiret

let node_module_isObject
let local_true
let parent_true

describe('requiret', function() {
  before('can be required', function() {
    requiret = require('./index.js')
  })

  it('can require something from node_modules', function() {
    node_module_isObject = requiret.require('isobject')
    expect(node_module_isObject).to.be.ok
  })

  it('can require something from ./', function() {
    local_true = requiret.require('./true.js')
    expect(local_true).to.be.ok
  })

  it('can require something with .. and handle folder imports', function() {
    parent_true = requiret.require('./subfolder')
    expect(parent_true).to.be.ok
  })

  it('can return times', function() {
    console.log(requiret.times)
    expect(requiret.times).to.be.ok
  })
})
