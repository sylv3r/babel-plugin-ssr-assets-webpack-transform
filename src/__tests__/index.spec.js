/* eslint-disable */
import { test } from 'ava'
import { transform } from '@babel/core'
import plugin from '../.'

const babelConfig = {
  // presets: [
  //   '@babel/preset-env',
  //   '@babel/preset-stage-0',
  // ],
  plugins: [
    plugin,
  ],
}

const trim = str => str.replace(/^[\n+|\s+]$/, '')

const babelTransform = (t, input, expected) => {
  const { code: inputCode } = transform(trim(input), babelConfig)
  const { code: expectedCode } = transform(trim(expected), babelConfig)

  t.is(inputCode, expectedCode)
}

test(
  'should remove import call expression by extensions',
  babelTransform,
  `import './index.sass';
  import './index.less';
  import * as babel from 'babel';`,
  'import * as babel from \'babel\';',
)
