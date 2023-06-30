import { isPlainObject } from "./isPlainObject";
import { PlainObject } from "../code/types";

export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}
