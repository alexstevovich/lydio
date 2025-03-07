import { Tag } from  '../src/index.mjs';

class MyHeader extends Tag
{
	constructor(brandSrc,brandAlt)
	{
		super('header')
		const brand = this.tag('a').attr('href','/')
		brand.leaf('img')
            .attr('src',brandSrc)
            .attr('alt',brandAlt)
	}
}

class MyFooter extends Tag
{
	constructor(text)
	{
		super('footer')
		this.text(text)
	}
}

const html = new Tag('html')
const head = html.tag('head')
const body = html.tag('body')
body.append(new MyHeader('./lydio-brand.webp','Picture of Lydio'))
body.text('Lydio is Awesome!')
body.append(new MyFooter('Thanks for stopping by!'))

console.log(html.toHtml())

{
    type:"main"
    content:
        [
            {
                type:"h",
                level:1,
                content:"Lydio Semantics"
            },
            {
                type:"p",
                content:"Lydio is Awesome"
            }
        ]
    }