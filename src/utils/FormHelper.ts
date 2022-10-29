export interface Validator {
    msg: string;
    validate: (value: string) => string | undefined;
}

export interface IFormatter {
    format: string;
    parse: (value: string) => string;
}

export class FormHelper {
    static validate(validators: Validator[] = []) {
        return (value: string): string | undefined => {
            let error: string | undefined;
            validators.forEach(validator => {
                if (error) return;
                error = validator.validate(value);
            });
            return error;
        };
    }
    static mask(formatter: IFormatter) {
        return (value: string): string => {
            return formatter.parse(value || '');
        };
    }
}
