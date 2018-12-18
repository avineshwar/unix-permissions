'use strict'

const assert = require('assert')

const TYPES = require('./types')

const getType = function(perm) {
  return TYPES.find(({ test }) => test(perm))
}

const getValidType = function(perm) {
  const type = getType(perm)
  assert(type.name !== 'invalid', `Invalid permissions: ${perm}`)
  return type
}

const isValid = function(perm) {
  return getType(perm) !== 'invalid'
}

module.exports = {
  getType,
  getValidType,
  isValid,
}