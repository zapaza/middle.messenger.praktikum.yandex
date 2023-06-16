export function cloneDeep<T extends object = object>(obj: T) {
    return JSON.parse(JSON.stringify(obj));
}
