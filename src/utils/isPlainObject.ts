import { PlainObject } from "../code/types";

export function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}
