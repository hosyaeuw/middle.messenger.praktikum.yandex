import { Validator } from '../FormHelper';

type PatternValidatorInitValue = {
    pattern: RegExp;
    msg: string;
};

class Pattern implements Validator {
    msg: string = '';
    pattern: RegExp = /\.{0,}/g;
    constructor({ pattern, msg }: PatternValidatorInitValue) {
        this.msg = msg;
        this.pattern = pattern;
    }

    validate(value: string) {
        if (!value) return undefined;
        if (!this.pattern.test(value.trim())) {
            return this.msg;
        }
        return undefined;
    }
}

export default Pattern;
