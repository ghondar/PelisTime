import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'

import DescriptionVideo from '../../js/components/DescriptionVideo.jsx'

const render = reactDom.renderToStaticMarkup

test('Description', assert => {
  const result = 'hello world'
  const props = {
    name: 'hello world'
  }
  const re = new RegExp(result, 'g')

  const el = <DescriptionVideo { ...props } />
  const $ = dom.load(render(el))
  const output = $('h2').html()
  const actual = re.test(output)
  const expected = true

  assert.equal(actual, expected,
    'La salida debe ser la correcta mostrada por el contador')

  assert.end()
})
