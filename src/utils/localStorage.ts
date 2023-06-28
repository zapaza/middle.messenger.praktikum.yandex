export type KnownLocalStorageKey = 'userId';

export function getLocalStorageItem<T>(key: KnownLocalStorageKey, defaultValue: T): T
export function getLocalStorageItem<T>(key: KnownLocalStorageKey, defaultValue?: T): T | undefined;
export function getLocalStorageItem<T>(key: KnownLocalStorageKey, defaultValue?: T): T | null {
  const result = window.localStorage.getItem(key) as string;

  if (result) {
    return JSON.parse(JSON.stringify(result));
  }

  if (defaultValue) {
    return defaultValue;
  }

  return null;
}

export function setLocalStorageItem(key: KnownLocalStorageKey, value: unknown): void {
  return window.localStorage.setItem(key, JSON.parse(JSON.stringify(value)));
}

export function removeLocalStorageItem(key: KnownLocalStorageKey): void {
  return window.localStorage.removeItem(key);
}
