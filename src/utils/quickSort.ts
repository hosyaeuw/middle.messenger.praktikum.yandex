export default function quickSort(arr: number[]): number[] {
    if (arr.length < 2) {
        return arr;
    }

    const min = 1;
    const max = arr.length - 1;
    const rand = Math.floor(min + Math.random() * (max + 1 - min));
    const pivot = arr[rand];
    const left = [];
    const right = [];
    arr.splice(arr.indexOf(pivot), 1);
    arr = [pivot].concat(arr);
    for (let i = 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}
