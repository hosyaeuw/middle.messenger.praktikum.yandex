export const checkValidators = (
    values: Record<string, string>,
    validators: Record<string, (value: string) => string | undefined>,
) => {
    return Object.keys(values).reduce((acc: Record<string, string | undefined>, key) => {
        acc[key] = validators[key](values[key]);
        return acc;
    }, {});
};
