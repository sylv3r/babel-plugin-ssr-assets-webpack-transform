/* eslint-disable no-console, func-names */
import { extname } from 'path'
// const { extname } = require('path')

const extensions = ['sass', 'less']
  .map(ext => (ext.charAt(0) === '.' ? ext : (`.${ext}`)))

// module.exports = function ({ types: t }) {
export default function ({ types: t }) {
  return {
    visitor: {
      CallExpression (path) {
        if (t.isIdentifier(path.node.callee, { name: 'require' })) {
          const arg = path.get('arguments')[0]
          if (t.isStringLiteral(arg) &&
            extensions.indexOf(extname(arg.node.value)) > -1) {
            path.parentPath.isVariableDeclarator() || path.remove()
          }
        }
      },
      ImportDeclaration (path) {
        if (extensions.indexOf(extname(path.node.source.value)) > -1) {
          const specifiers = path.get('specifiers')
          specifiers.length || path.remove()
        }
      },
    },
  }
}
