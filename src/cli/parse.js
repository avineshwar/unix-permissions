'use strict'

const { argv } = require('process')

const { escapeArgs } = require('./escape')

const parseConfig = function({ yargs }) {
  const args = escapeArgs(argv.slice(2))

  const {
    // eslint-disable-next-line id-length
    _: [command],
    permission,
    permissions = [],
  } = yargs.parse(args)

  // Retrieve all positional arguments, including none
  // We do not allow `number` permissions because they are hard to distinguish
  // from `octal` permissions, which are more likely.
  const argsA = [permission, ...permissions].filter(isDefined).map(parseArg)

  return { command, args: argsA }
}

const isDefined = function(value) {
  return value !== undefined
}

const parseArg = function(value) {
  const object = parseObject(value)

  if (object !== undefined) {
    return object
  }

  return value
}

// Allow `object` as input
const parseObject = function(value) {
  if (typeof value !== 'string' || !value.startsWith('{')) {
    return
  }

  try {
    return JSON.parse(value)
  } catch {}
}

module.exports = {
  parseConfig,
}
