import { Validator } from '../FormHelper';
type RangeValidatorInitValue = {
    min?: number;
    max?: number;
    msg: string;
};

export class Range implements Validator {
    msg: string = '';
    min?: number;
    max?: number;

    constructor({ min, max, msg }: RangeValidatorInitValue) {
        if (min && min < 0) {
            throw Error('RangeValidator: The minimum value cannot be less than 0');
        }
        if (min === undefined && max === undefined) {
            throw Error('RangeValidator: You have not specified a maximum or minimum value.');
        }
        this.msg = msg;
        this.min = min;
        this.max = max;
    }

    validate(value: string) {
        if (value) {
            if (this.min && value.length < this.min) {
                return this.msg;
            }
            if (this.max && value.length > this.max) {
                return this.msg;
            }
            if (this.min && this.max && (value.length < this.min || value.length > this.max)) {
                return this.msg;
            }
        }

        return undefined;
    }
}
