/* *******************************************************
 * lydio
 *
 * Copyright (c) 2015-2025 Alex Stevovich. All Rights Reserved.
 *
 * No permission is granted to use, copy, modify,
 * distribute, sublicense, or create derivative works
 * of this software, in whole or in part, without explicit
 * prior written permission from the copyright holder.
 *
 * @meta
 *
 * package_name: lydio
 * file_name: src/index.js
 * purpose: Core functionality and exports combined.
 *
 * @system
 *
 * generated_on: 2025-03-11T00:42:43.503Z
 * certified_version: 1.0.0
 * file_uuid: 5f33790f-f0ca-4d2b-a5b5-36f8896b4876
 * file_size: 13448 bytes
 * file_hash: 8fb2b80e48c0c514e432f7be1c4437420a07c79fb71116d745d9a248bd9beaa0
 * mast_hash: 97b28e6e6408812f18d711cdf1eea3d8afa648499ebab7a8fbdcefc3e2996b1f
 * generated_by: preamble on npm!
 *
 * [Preamble Metadata]
 ********************************************************/
const Global = { xmlCompliantDefault: false };

function defineCoreType(cls, type) {
    Object.defineProperty(cls, 'nodeCoreType', {
        value: type,
        writable: false,
        configurable: false,
        enumerable: true,
    });
}
const SELF_CLOSING_TAGS = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
]);

/**
function _sanitizeText(input) {
    // Offline basic sanitization: Strip <script>, <iframe>, and similar tags
    return input.replace(
        /<\/?(script|iframe|object|embed|link|meta|style|form|input|textarea|button)[^>]*>/gi,
        '',
    );
}
*/

function escapeHtml(str) {
    if (typeof str !== 'string') {
        str = String(str); // Convert to string explicitly
    }

    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export const ComplaintSeverity = {
    INFO: 'info',
    LOW: 'low',
    MILD: 'mild',
    HIGH: 'high',
};
class Complaint {
    constructor(element, message, { severity = ComplaintSeverity.INFO } = {}) {
        this.id = element.nodeId;
        this.type = element.nodeType;
        this.message = message;
        this.severity = severity;
    }
    toString() {
        return `[Complaint] [${this.severity}] ${this.type}${this.id ? `#${this.id}` : ''} → ${this.message}`;
    }
}
class Node {
    static get nodeType() {
        return 'node';
    }
    constructor() {
        //node
        this._parentElement = null;
        this._nodeId = null;
        //container
        this._children = [];
        //element
        this._tagName = null;
        //attributes
        this._classes = new Set();
        this._attributes = {};
        this._styles = [];
        this._id = null;
        this._xforms = [];
    }
    get nodeId() {
        return this._nodeId;
    }
    get nodeType() {
        return this.constructor.nodeType;
    }
    nid(value) {
        this._nodeId = value;

        return this;
    }
    parent() {
        return this._parentElement;
    }
    root() {
        return this.getRoot();
    }
    error(message) {
        throw new Error(`[Lydio Error]: ` + message);
    }
    //element
    get tagName() {
        return this._tagName;
    }
    //attribute
    cls(className) {
        this._classes.add(className);

        return this;
    }
    id(value) {
        this._id = value;

        return this;
    }
    attr(key, value = null) {
        this._attributes[key] = value;

        return this;
    }
    style(prop, value) {
        this._styles.push(`${prop}: ${value}`);

        return this;
    }
    _renderAttributes() {
        let attrs = [];
        if (this._classes.size) {
            attrs.push(`class="${Array.from(this._classes).join(' ')}"`);
        }
        if (this._id) {
            attrs.push(`id="${this._id}"`);
        }
        if (this._styles.length) {
            // Ensure styles end with a semicolon
            const styles = this._styles.join('; ').trim();
            this._attributes['style'] = styles.endsWith(';')
                ? styles
                : styles + ';';
        }
        for (const [key, value] of Object.entries(this._attributes)) {
            if (value === null) {
                attrs.push(key);
            } else {
                attrs.push(`${key}="${escapeHtml(value)}"`);
            }
        }

        return attrs.length ? ' ' + attrs.join(' ') : '';
    }
    complain(message, { severity = ComplaintSeverity.INFO } = {}) {
        return new Complaint(this, message, { severity });
    }
    coreComplaints() {
        return [];
    }
    complaints() {
        return [];
    }
    audit() {
        let issues = [...this.coreComplaints(), ...this.complaints()];
        for (const child of this._children) {
            issues = issues.concat(child.audit());
        }

        return issues;
    }
    validate() {
        return this.audit().length === 0;
    }
    debugValidate() {
        const complaints = this.audit();
        if (complaints.length > 0) {
            console.warn(`[Lydio:Audit] Found ${complaints.length} complaints`);
            complaints.forEach((issue) => {
                console.warn(`[Lydio:Audit]: ${issue.toString()}`);
            });

            return false;
        }

        return true;
    }
    /**
    nsBubble(namespace) {
        this.bubble((node) => {
            const originalClasses = [...node._classes];
            originalClasses.forEach(cls => {
                node.cls(`${namespace}${cls}`);
            });
        });
    }
    */
    /**
    bemBubble(namespace) {
        this.bubble((node) => {
            const originalClasses = [...node._classes];
            originalClasses.forEach(cls => {
                node.cls(`${namespace}__${cls}`);
            });
        });
    }
    */
    bubble(callback) {
        callback(this);
        for (const child of this._children) {
            child.bubble(callback);
        }
    }
    getMeaningfulTextContent() {
        return this._children
            .map((child) =>
                typeof child.getMeaningfulTextContent === 'function'
                    ? child.getMeaningfulTextContent()
                    : '',
            )
            .join(' ')
            .trim();
    }
    _toHtml() {
        return this._children.reduce((html, el) => html + el.toHtml(), '');
    }
    toMeaning() {
        const meaning = [];
        for (const child of this._children) {
            if (typeof child.extractMeaning === 'function') {
                const childMeaning = child.toMeaning();
                if (Array.isArray(childMeaning)) {
                    meaning.push(...childMeaning); // flatten child arrays
                } else if (childMeaning) {
                    meaning.push(childMeaning); // add single objects
                }
            }
        }

        return meaning.length > 0 ? meaning : null;
    }
}
class Tag extends Node {
    static get nodeType() {
        return 'tag';
    }
    constructor(tagName) {
        super();
        if (typeof tagName !== 'string' || !tagName.trim()) {
            throw new Error(
                `[Lydio Error]: tagName must be a non-empty string.`,
            );
        }
        Object.defineProperty(this, '_tagName', {
            value: tagName,
            writable: false,
            configurable: false,
            enumerable: false,
        });
    }
    append(element) {
        element._parentElement = this;
        this._children.push(element);

        return element;
    }
    leaf(tagName) {
        const child = new Leaf(tagName);

        return this.append(child);
    }
    tag(tagName) {
        const child = new Tag(tagName);

        return this.append(child);
    }
    fragment() {
        const child = new Fragment();

        return this.append(child);
    }
    text(content) {
        this.append(new Text(content));

        return this;
    }
    doctype(type = 'html') {
        const child = new Doctype(type);

        return this.append(child);
    }
    coreComplaints() {
        let complaints = [];
        if (SELF_CLOSING_TAGS.has(this._tagName)) {
            let complaint = this.complain(
                `TagName: ${this._tagName} is invalid for nodeType.tag`,
                { severity: ComplaintSeverity.HIGH },
            );
            complaints.push(complaint);
        }

        return complaints;
    }
    toHtml() {
        const attrs = this._renderAttributes();
        const content = this._children.reduce(
            (html, el) => html + el.toHtml(),
            '',
        );

        return `<${this._tagName}${attrs}>${content}</${this._tagName}>`;
    }
}
class Fragment extends Node {
    static get nodeType() {
        return 'fragment';
    }
    constructor() {
        super();
    }
    append(element) {
        element._parentElement = this;
        this._children.push(element);

        return element;
    }
    leaf(tagName) {
        const child = new Leaf(tagName);

        return this.append(child);
    }
    tag(tagName) {
        const child = new Tag(tagName);

        return this.append(child);
    }
    fragment() {
        const child = new Fragment();

        return this.append(child);
    }
    text(content) {
        this.append(new Text(content));

        return this;
    }
    doctype(type = 'html') {
        const child = new Doctype(type);

        return this.append(child);
    }
    toHtml() {
        return this._children.reduce((html, el) => html + el.toHtml(), '');
    }
}
class Leaf extends Node {
    static get nodeType() {
        return 'leaf';
    }
    constructor(tagName) {
        super();
        if (typeof tagName !== 'string' || !tagName.trim()) {
            throw new Error(
                `[Lydio Error]: tagName must be a non-empty string.`,
            );
        }
        Object.defineProperty(this, '_tagName', {
            value: tagName,
            writable: false,
            configurable: false,
            enumerable: false,
        });
    }
    coreComplaints() {
        let complaints = [];
        if (!SELF_CLOSING_TAGS.has(this._tagName)) {
            let complaint = this.complain(
                `TagName: ${this._tagName} is invalid for nodeType.leaf`,
                { severity: ComplaintSeverity.HIGH },
            );
            complaints.push(complaint);
        }

        return complaints;
    }
    toHtml({ xmlCompliant = Global.xmlCompliantDefault } = {}) {
        const attrs = this._renderAttributes();

        return xmlCompliant
            ? `<${this._tagName}${attrs}/>`
            : `<${this._tagName}${attrs}>`;
    }
}

/* Not currently used.
I'm evaluating a runtime swapout module that lets client side js write lydio
This would mirror .textContent in that case as opposed to .innerHtml.
class SanitizedText extends Node {
    _content;
    static get nodeType() {
        return 'sanitized-text';
    }
    constructor(content) {
        super();
        this.set(content);
    }
    set(content) {
        this._content = _sanitizeText(content);

        return this;
    }
    toHtml() {
        return escapeHtml(this._content);
    }
}
*/
class Text extends Node {
    _content;
    static get nodeType() {
        return 'text';
    }
    constructor(content) {
        super();
        this._content = content;

        return this;
    }
    set(content) {
        this._content = content;
    }
    toHtml() {
        return this._content;
    }
    getMeaningfulTextContent() {
        return Text.extractMeaningfulText(this._content);
    }
    static extractMeaningfulText(content) {
        return content
            .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
            .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
            .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, '')
            .replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, '')
            .replace(
                /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi,
                (_, href, text) => {
                    return `[url=${href}]${text.trim()}[/url]`;
                },
            )
            .replace(/<(b|strong)>/gi, '[b]')
            .replace(/<\/(b|strong)>/gi, '[/b]')
            .replace(/<(i|em)>/gi, '[i]')
            .replace(/<\/(i|em)>/gi, '[/i]')
            .replace(/<u>/gi, '[u]')
            .replace(/<\/u>/gi, '[/u]')
            .replace(/<\/?[^>]+(>|$)/g, '')
            .trim();
    }
}
const VALID_DOCTYPES = new Set([
    'html',
    'xhtml',
    'transitional',
    'strict',
    'frameset',
]);
class Doctype extends Node {
    _type;
    _force;
    static get nodeType() {
        return 'doctype';
    }
    constructor(type = 'html', { force = false } = {}) {
        super();
        this._type = type;
        this._force = force;
    }
    coreComplaints() {
        let complaints = [];
        if (!this._force && !VALID_DOCTYPES.has(this._type)) {
            let complaint = this.complain(
                `Invalid DOCTYPE: ${this._type}. Use a valid one or set force: true.`,
                { severity: ComplaintSeverity.HIGH },
            );
            complaints.push(complaint);
        }

        return complaints;
    }
    toHtml() {
        return `<!DOCTYPE ${this._type}>`;
    }
}
defineCoreType(Tag, 'tag');
defineCoreType(Fragment, 'fragment');
defineCoreType(Leaf, 'leaf');
defineCoreType(Text, 'text');
defineCoreType(Doctype, 'doctype');

export { Global, Tag, Leaf, Fragment };

export default { Global, Tag, Leaf, Fragment };
