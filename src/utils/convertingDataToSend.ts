import { camelToSnakeCase } from './camelToSnakeCase';
import { isObject } from './isObject';

export const convertingDataToSend = (data: unknown) => {
    if (isObject(data)) {
        const typedData = data as anyObj;
        const result: anyObj = {};
        Object.keys(typedData).forEach(key => {
            result[camelToSnakeCase(key)] = typedData[key];
        });

        return result;
    }

    return data;
};
