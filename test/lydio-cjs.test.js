import { describe, it, expect } from 'vitest';
const { Tag, Leaf, Fragment } = require('../gen/index.cjs');

describe('Lydio HTML Tests', () => {
    it('Basic Tag Creation', () => {
        const div = new Tag('div')
            .cls('container')
            .attr('data-type', 'main')
            .style('color', 'red')
            .text('Hello, Lydio!');

        expect(div.toHtml()).toBe(
            '<div class="container" data-type="main" style="color: red;">Hello, Lydio!</div>',
        );
    });

    it('Nested Elements', () => {
        const container = new Tag('div')
            .cls('main-container')
            .tag('h1')
            .text('Welcome to Lydio')
            .parent()
            .tag('p')
            .text('Generate HTML easily.')
            .parent();
        expect(container.toHtml()).toBe(
            '<div class="main-container"><h1>Welcome to Lydio</h1><p>Generate HTML easily.</p></div>',
        );
    });

    it('Self-Closing Elements (Leaf)', () => {
        const img = new Leaf('img')
            .attr('src', 'logo.png')
            .attr('alt', 'Lydio Logo');

        expect(img.toHtml()).toBe('<img src="logo.png" alt="Lydio Logo">');
    });

    it('Fragment with Multiple Root Elements', () => {
        const block = new Fragment()
            .tag('h2')
            .text('Fragment Title')
            .parent()
            .tag('p')
            .text('Fragment content goes here.')
            .parent();
        expect(block.toHtml()).toBe(
            '<h2>Fragment Title</h2><p>Fragment content goes here.</p>',
        );
    });

    it('Parent Navigation', () => {
        const nested = new Tag('div')
            .cls('outer')
            .tag('section')
            .cls('inner')
            .tag('p')
            .text('Inside paragraph')
            .parent()
            .parent();

        expect(nested.toHtml()).toBe(
            '<div class="outer"><section class="inner"><p>Inside paragraph</p></section></div>',
        );
    });
});
