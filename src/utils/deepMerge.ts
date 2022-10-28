import isObject from './isObject';

function mergeValues(a: unknown, b: unknown) {
    if (isObject(a) && isObject(b)) {
        return deepMerge(a as anyObj, b as anyObj);
    }

    return a ?? b;
}

function deepMerge(source: anyObj, target: anyObj): anyObj {
    const result: anyObj = {};
    const objectKeys = new Set();
    Object.keys(source).forEach(objectKeys.add, objectKeys);
    Object.keys(target).forEach(objectKeys.add, objectKeys);

    objectKeys.forEach(key => {
        const objectKey: string = key as string;
        result[objectKey] = mergeValues(source[objectKey], target[objectKey]);
    });

    return result;
}

export default deepMerge;
