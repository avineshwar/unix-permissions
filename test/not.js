'use strict'

const { SIMPLE_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should negate ${args}`,
  command: 'not',
  data: SIMPLE_DATA,
})