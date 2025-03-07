import { Tag, Leaf, Fragment } from '../src/index.mjs';

console.log("Running Lydio: HTML Tests...\n");

// Test 1: Basic Tag Creation
const div = new Tag('div')
    .cls('container')
    .attr('data-type', 'main')
    .style('color', 'red')
    .text('Hello, Lydio!');

console.log("Test 1 - Basic Tag Creation:");
console.log(div.toHtml());
console.log("Expected:");
console.log('<div class="container" data-type="main" style="color: red;">Hello, Lydio!</div>\n');

// Test 2: Nested Elements
const container = new Tag('div')
    .cls('main-container')
    .tag('h1')
        .text('Welcome to Lydio')
    .parent()
    .tag('p')
        .text('Generate HTML easily.');

console.log("Test 2 - Nested Elements:");
console.log(container.toHtml());
console.log("Expected:");
console.log(`<div class="main-container">
    <h1>Welcome to Lydio</h1>
    <p>Generate HTML easily.</p>
</div>\n`);

// Test 3: Self-Closing Elements (Leaf)
const img = new Leaf('img')
    .attr('src', 'logo.png')
    .attr('alt', 'Lydio Logo');

console.log("Test 3 - Self-Closing Elements (Leaf):");
console.log(img.toHtml());
console.log("Expected:");
console.log('<img src="logo.png" alt="Lydio Logo"> (or self-closing if XML compliant)\n');

// Test 4: Fragment with Multiple Root Elements
const block = new Fragment()
    .tag('h2').text('Fragment Title').parent()
    .tag('p').text('Fragment content goes here.');

console.log("Test 4 - Fragment with Multiple Root Elements:");
console.log(block.toHtml());
console.log("Expected:");
console.log(`<h2>Fragment Title</h2>
<p>Fragment content goes here.</p>\n`);

// Test 5: Parent Navigation
const nested = new Tag('div')
    .cls('outer')
    .tag('section')
        .cls('inner')
        .tag('p')
            .text('Inside paragraph')
        .parent()
    .parent();

console.log("Test 5 - Parent Navigation:");
console.log(nested.toHtml());
console.log("Expected:");
console.log(`<div class="outer">
    <section class="inner">
        <p>Inside paragraph</p>
    </section>
</div>\n`);

// Test Completion
console.log("\nAll tests completed. Manually verify outputs match expected results.");
