import { Validator } from '../FormHelper';

type RequireValidatorInitValue = {
    msg: string;
};

class Require implements Validator {
    msg: string = '';
    constructor({ msg }: RequireValidatorInitValue) {
        this.msg = msg;
    }

    validate(value: unknown) {
        if (typeof value === 'string') {
            value = value.trim();
        }
        if (
            value === false ||
            value === null ||
            value === '' ||
            value === undefined ||
            (Array.isArray(value) && !value.length)
        ) {
            return this.msg;
        }

        return undefined;
    }
}

export default Require;
