declare module "index" {
    export namespace ComplaintSeverity {
        let INFO: string;
        let LOW: string;
        let MILD: string;
        let HIGH: string;
    }
    namespace _default {
        export { Global };
        export { Tag };
        export { Leaf };
        export { Fragment };
    }
    export default _default;
    export namespace Global {
        let xmlCompliantDefault: boolean;
    }
    export class Tag extends Node {
        constructor(tagName: any);
        append(element: any): any;
        leaf(tagName: any): any;
        tag(tagName: any): any;
        fragment(): any;
        text(content: any): this;
        doctype(type?: string): any;
        coreComplaints(): Complaint[];
        toHtml(): string;
    }
    export class Leaf extends Node {
        constructor(tagName: any);
        coreComplaints(): Complaint[];
        toHtml({ xmlCompliant }?: {
            xmlCompliant?: boolean;
        }): string;
    }
    export class Fragment extends Node {
        append(element: any): any;
        leaf(tagName: any): any;
        tag(tagName: any): any;
        fragment(): any;
        text(content: any): this;
        doctype(type?: string): any;
        toHtml(): any;
    }
    class Node {
        static get nodeType(): string;
        _parentElement: any;
        _nodeId: any;
        _children: any[];
        _tagName: any;
        _classes: Set<any>;
        _attributes: {};
        _styles: any[];
        _id: any;
        _xforms: any[];
        get nodeId(): any;
        get nodeType(): any;
        nid(value: any): this;
        parent(): any;
        root(): any;
        error(message: any): void;
        get tagName(): any;
        cls(className: any): this;
        id(value: any): this;
        attr(key: any, value?: any): this;
        style(prop: any, value: any): this;
        _renderAttributes(): string;
        complain(message: any, { severity }?: {
            severity?: string;
        }): Complaint;
        coreComplaints(): any[];
        complaints(): any[];
        audit(): any[];
        validate(): boolean;
        debugValidate(): boolean;
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
        bubble(callback: any): void;
        getMeaningfulTextContent(): string;
        _toHtml(): any;
        toMeaning(): any[];
    }
    class Complaint {
        constructor(element: any, message: any, { severity }?: {
            severity?: string;
        });
        id: any;
        type: any;
        message: any;
        severity: string;
        toString(): string;
    }
}
