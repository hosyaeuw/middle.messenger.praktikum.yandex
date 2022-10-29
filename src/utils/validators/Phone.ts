import { Pattern } from './Pattern';

type PhoneValidatorInitValue = {
    msg: string;
    countNumbers?: number;
};

export class Phone extends Pattern {
    constructor({ msg }: PhoneValidatorInitValue) {
        super({ msg, pattern: /^\+?([0-9]{10,15})$/ });
    }
}
