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
 * file_name: gen/index.cjs
 * purpose: {{PURPOSE}}
 *  
 * @system
 *
 * generated_on: 2025-03-11T00:45:08.258Z
 * certified_version: 1.0.0
 * file_uuid: 218298aa-f496-4fe2-9069-f07adc1b149f
 * file_size: 11260 bytes
 * file_hash: c89aa216d35e6fba7cdc13b9e47602d049713764b16406a8bae7582131aa8f43
 * mast_hash: f8ff3484836bf27af0f617798e5042f1dda9d278929689758a8113cd3628f125
 * generated_by: preamble on npm!
 *
 * [Preamble Metadata]
********************************************************/ 
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var index_exports = {};
__export(index_exports, {
  ComplaintSeverity: () => ComplaintSeverity,
  Fragment: () => Fragment,
  Global: () => Global,
  Leaf: () => Leaf,
  Tag: () => Tag,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
const Global = { xmlCompliantDefault: false };
function defineCoreType(cls, type) {
  Object.defineProperty(cls, "nodeCoreType", {
    value: type,
    writable: false,
    configurable: false,
    enumerable: true
  });
}
const SELF_CLOSING_TAGS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function escapeHtml(str) {
  if (typeof str !== "string") {
    str = String(str);
  }
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const ComplaintSeverity = {
  INFO: "info",
  LOW: "low",
  MILD: "mild",
  HIGH: "high"
};
class Complaint {
  constructor(element, message, { severity = ComplaintSeverity.INFO } = {}) {
    this.id = element.nodeId;
    this.type = element.nodeType;
    this.message = message;
    this.severity = severity;
  }
  toString() {
    return `[Complaint] [${this.severity}] ${this.type}${this.id ? `#${this.id}` : ""} \u2192 ${this.message}`;
  }
}
class Node {
  static get nodeType() {
    return "node";
  }
  constructor() {
    this._parentElement = null;
    this._nodeId = null;
    this._children = [];
    this._tagName = null;
    this._classes = /* @__PURE__ */ new Set();
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
      attrs.push(`class="${Array.from(this._classes).join(" ")}"`);
    }
    if (this._id) {
      attrs.push(`id="${this._id}"`);
    }
    if (this._styles.length) {
      const styles = this._styles.join("; ").trim();
      this._attributes["style"] = styles.endsWith(";") ? styles : styles + ";";
    }
    for (const [key, value] of Object.entries(this._attributes)) {
      if (value === null) {
        attrs.push(key);
      } else {
        attrs.push(`${key}="${escapeHtml(value)}"`);
      }
    }
    return attrs.length ? " " + attrs.join(" ") : "";
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
    return this._children.map(
      (child) => typeof child.getMeaningfulTextContent === "function" ? child.getMeaningfulTextContent() : ""
    ).join(" ").trim();
  }
  _toHtml() {
    return this._children.reduce((html, el) => html + el.toHtml(), "");
  }
  toMeaning() {
    const meaning = [];
    for (const child of this._children) {
      if (typeof child.extractMeaning === "function") {
        const childMeaning = child.toMeaning();
        if (Array.isArray(childMeaning)) {
          meaning.push(...childMeaning);
        } else if (childMeaning) {
          meaning.push(childMeaning);
        }
      }
    }
    return meaning.length > 0 ? meaning : null;
  }
}
class Tag extends Node {
  static get nodeType() {
    return "tag";
  }
  constructor(tagName) {
    super();
    if (typeof tagName !== "string" || !tagName.trim()) {
      throw new Error(
        `[Lydio Error]: tagName must be a non-empty string.`
      );
    }
    Object.defineProperty(this, "_tagName", {
      value: tagName,
      writable: false,
      configurable: false,
      enumerable: false
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
  doctype(type = "html") {
    const child = new Doctype(type);
    return this.append(child);
  }
  coreComplaints() {
    let complaints = [];
    if (SELF_CLOSING_TAGS.has(this._tagName)) {
      let complaint = this.complain(
        `TagName: ${this._tagName} is invalid for nodeType.tag`,
        { severity: ComplaintSeverity.HIGH }
      );
      complaints.push(complaint);
    }
    return complaints;
  }
  toHtml() {
    const attrs = this._renderAttributes();
    const content = this._children.reduce(
      (html, el) => html + el.toHtml(),
      ""
    );
    return `<${this._tagName}${attrs}>${content}</${this._tagName}>`;
  }
}
class Fragment extends Node {
  static get nodeType() {
    return "fragment";
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
  doctype(type = "html") {
    const child = new Doctype(type);
    return this.append(child);
  }
  toHtml() {
    return this._children.reduce((html, el) => html + el.toHtml(), "");
  }
}
class Leaf extends Node {
  static get nodeType() {
    return "leaf";
  }
  constructor(tagName) {
    super();
    if (typeof tagName !== "string" || !tagName.trim()) {
      throw new Error(
        `[Lydio Error]: tagName must be a non-empty string.`
      );
    }
    Object.defineProperty(this, "_tagName", {
      value: tagName,
      writable: false,
      configurable: false,
      enumerable: false
    });
  }
  coreComplaints() {
    let complaints = [];
    if (!SELF_CLOSING_TAGS.has(this._tagName)) {
      let complaint = this.complain(
        `TagName: ${this._tagName} is invalid for nodeType.leaf`,
        { severity: ComplaintSeverity.HIGH }
      );
      complaints.push(complaint);
    }
    return complaints;
  }
  toHtml({ xmlCompliant = Global.xmlCompliantDefault } = {}) {
    const attrs = this._renderAttributes();
    return xmlCompliant ? `<${this._tagName}${attrs}/>` : `<${this._tagName}${attrs}>`;
  }
}
class Text extends Node {
  _content;
  static get nodeType() {
    return "text";
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
    return content.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "").replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "").replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "").replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, "").replace(
      /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi,
      (_, href, text) => {
        return `[url=${href}]${text.trim()}[/url]`;
      }
    ).replace(/<(b|strong)>/gi, "[b]").replace(/<\/(b|strong)>/gi, "[/b]").replace(/<(i|em)>/gi, "[i]").replace(/<\/(i|em)>/gi, "[/i]").replace(/<u>/gi, "[u]").replace(/<\/u>/gi, "[/u]").replace(/<\/?[^>]+(>|$)/g, "").trim();
  }
}
const VALID_DOCTYPES = /* @__PURE__ */ new Set([
  "html",
  "xhtml",
  "transitional",
  "strict",
  "frameset"
]);
class Doctype extends Node {
  _type;
  _force;
  static get nodeType() {
    return "doctype";
  }
  constructor(type = "html", { force = false } = {}) {
    super();
    this._type = type;
    this._force = force;
  }
  coreComplaints() {
    let complaints = [];
    if (!this._force && !VALID_DOCTYPES.has(this._type)) {
      let complaint = this.complain(
        `Invalid DOCTYPE: ${this._type}. Use a valid one or set force: true.`,
        { severity: ComplaintSeverity.HIGH }
      );
      complaints.push(complaint);
    }
    return complaints;
  }
  toHtml() {
    return `<!DOCTYPE ${this._type}>`;
  }
}
defineCoreType(Tag, "tag");
defineCoreType(Fragment, "fragment");
defineCoreType(Leaf, "leaf");
defineCoreType(Text, "text");
defineCoreType(Doctype, "doctype");
var index_default = { Global, Tag, Leaf, Fragment };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComplaintSeverity,
  Fragment,
  Global,
  Leaf,
  Tag
});
