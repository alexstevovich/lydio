import { describe, it, expect } from 'vitest';
import { Tag } from '../src/index.js';

describe('Lydio Example Tests', () => {
    it('Basic Example', () => {
        const html = new Tag('html');
        const head = html.tag('head');
        const body = html.tag('body');
        body.text('Lydio is Awesome!');

        console.log(html.toHtml());

        expect(html.toHtml()).toBe(
            '<html><head></head><body>Lydio is Awesome!</body></html>',
        );
    });
    it('Basic Component Example', () => {
        class MyHeader extends Tag {
            constructor(brandSrc, brandAlt) {
                super('header');
                const brand = this.tag('a').attr('href', '/');
                brand.leaf('img').attr('src', brandSrc).attr('alt', brandAlt);
            }
        }

        const body = new Tag('body');
        body.append(new MyHeader('./lydio-brand.webp', 'A picture of Lydio'));

        expect(body.toHtml()).toBe(
            '<body><header><a href="/"><img src="./lydio-brand.webp" alt="A picture of Lydio"></a></header></body>',
        );
    });
});
