# Lydio

**DISCLAIMER:**

#### 🚨This project is not open source. It is exposed to satisfy requirements related to my business.

_Thank you for your understanding._

---

**Beautiful, Composable, Programmatic HTML Authoring**

Write a tag. Make a component. Build a site. All in plain JavaScript.

Forget templates. Forget frameworks. Lydio lets you build pure, scalable HTML structures through code — readable, modular, and composable from top to bottom.

[https://github.com/alexstevovich/lydio](https://github.com/alexstevovich/lydio)

---

### Quick Example:

```js
import { Tag } from 'lydio';

const html = new Tag('html');
const head = html.tag('head');
const body = html.tag('body');

body.text('Lydio is Awesome!');

console.log(html.toHtml());

/*
<html><head></head><body>Lydio is Awesome!</body></html>
*/
```

### With Components:

```js
import { Tag } from 'lydio';

class MyHeader extends Tag {
    constructor(brandSrc, brandAlt) {
        super('header');
        const brand = this.tag('a').href('/');
        brand.leaf('img').src(brandSrc).alt(brandAlt);
    }
}

const body = new Tag('body');
body.append(new MyHeader('./lydio-brand.webp', 'A picture of Lydio'));

console.log(body.toHtml());
```

## Features

### API:

- Elegant, clear, and minimal HTML writing.

- Fluent when you want it to be.

- Fully programmatic, full control.

- The programmatic nature allows complex HTML components to be easily made and shared.

### No framework:

- Each piece outputs standard HTML

- No forced bundlers

- No forced server architecture

- No proprietary documents

- No black boxes

# Core Types

3 core types are offered to express HTML they all extend from one base type

### Node (Abstract Base)

Lydio gives you three basic building blocks to express HTML programmatically:

- `Tag`: For regular elements like `<div>`.

- `Leaf`: For self-closing elements like `<img>`.

- `Fragment`: For grouping elements without a wrapper.

These all extend from a shared base `Node` with common methods and properties.

# Advanced Features

## Bubble

Bubbling a node lets a function recursively be applied to all nested nodes. You can transform an entire hierarchy however you want.

Apply BEM, style scopes and more. You can write your own but I provide a default library of these here:

[https://github.com/alexstevovich/lydio-bubbles](https://github.com/alexstevovich/lydio-bubbles)

## Components

You can make reusable configurable components easily. Here's a few premade plugins:

- The entire web standard semantics: [@lydio/semantics](https://github.com/alexstevovich/lydio-semantics)

- The head meta web standard: [@lydio/meta](https://github.com/alexstevovich/lydio-meta)

## Audit

#### `audit()`

Check your structure at any time with `.audit()` to catch invalid HTML and get helpful feedback. You can even extend audits on your own components for custom validation.

### Meaning

#### `toMeaning()`

Get a semantic summary of your site, including hidden content like `aria-labels` and `alt` text.

Useful for extracting plain-text structure to share with copy editors or LLMs, or for auditing meaningful content across your project.

Each component can override `toMeaning()` to define its own output.

## Css

[Marle](https://github.com/alexstevovich/marle) a companion package for programmatic CSS authoring.

## License

This project is not open source. It is exposed to satisfy requirements related to my business.
_Thank you for your understanding_

Copyright © 2015-2025 Alex Stevovich. All Rights Reserved.
No permission is granted to use, copy, modify, distribute, sublicense, or create derivative works of this software, in whole or in part, without explicit prior written permission from the copyright holder.

See `LICENSE` and `TRADEMARK.md` for more.
