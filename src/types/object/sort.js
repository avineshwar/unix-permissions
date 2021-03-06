'use strict'

const { CATEGORY_ORDER, PERM_ORDER } = require('./constants')

// Ensure object keys order
const compareNodes = function(nodeA, nodeB) {
  const result = sortCategory(nodeA, nodeB)

  if (result !== 0) {
    return result
  }

  return sortPerm(nodeA, nodeB)
}

const sort = function({ attrName, order }, nodeA, nodeB) {
  if (nodeA[attrName] === nodeB[attrName]) {
    return 0
  }

  return order.indexOf(nodeA[attrName]) > order.indexOf(nodeB[attrName])
    ? 1
    : -1
}

const sortCategory = sort.bind(null, {
  attrName: 'category',
  order: CATEGORY_ORDER,
})
const sortPerm = sort.bind(null, {
  attrName: 'permission',
  order: PERM_ORDER,
})

module.exports = {
  compareNodes,
}
