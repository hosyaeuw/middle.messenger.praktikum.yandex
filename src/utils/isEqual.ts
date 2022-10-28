import mergeSort from './mergeSort';

export default function isEqualObj(obj: anyObj, another: anyObj) {
    if (!obj || !another) {
        throw Error('no objs');
    }

    return mergeSort(JSON.stringify(obj)).join('') === mergeSort(JSON.stringify(another)).join('');
}
