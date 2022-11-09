export function mergeSort(items: number[] | string): (number | string)[] {
    let array: (number | string)[] = typeof items === 'string' ? [...items] : items;

    return divide(array);
}

function divide(items: (number | string)[]): (number | string)[] {
    const halfLength = Math.ceil(items.length / 2);
    let low = items.slice(0, halfLength);
    let high = items.slice(halfLength);
    if (halfLength > 1) {
        low = divide(low);
        high = divide(high);
    }

    return combine(low, high);
}

function combine(low: (number | string)[], high: (number | string)[]): (number | string)[] {
    let indexLow = 0;
    let indexHigh = 0;
    const lengthLow = low.length;
    const lengthHigh = high.length;
    const combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
        const lowItem = low[indexLow];
        const highItem = high[indexHigh];
        if (lowItem !== undefined) {
            if (highItem === undefined) {
                combined.push(lowItem);
                indexLow++;
            } else {
                if (lowItem <= highItem) {
                    combined.push(lowItem);
                    indexLow++;
                } else {
                    combined.push(highItem);
                    indexHigh++;
                }
            }
        } else {
            if (highItem !== undefined) {
                combined.push(highItem);
                indexHigh++;
            }
        }
    }

    return combined;
}
