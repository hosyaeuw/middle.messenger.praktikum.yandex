import { isObject } from './isObject';

export function deepClone(obj: anyObj): anyObj {
    const clone: anyObj = { ...obj };
    Object.keys(clone).forEach(
        key => (clone[key] = isObject(obj[key]) ? deepClone(obj[key] as anyObj) : obj[key]),
    );

    return clone;
}
