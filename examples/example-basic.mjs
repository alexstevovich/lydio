import { Tag } from  '../src/index.mjs';

const html = new Tag('html')
const head = html.tag('head')
const body = html.tag('body')
body.text('Lydio is Awesome!')

console.log(html.toHtml())