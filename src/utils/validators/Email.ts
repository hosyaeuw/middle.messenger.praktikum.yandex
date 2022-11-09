import { Pattern } from './Pattern';

type EmailValidatorInitValue = {
    msg: string;
};

export class Email extends Pattern {
    constructor({ msg }: EmailValidatorInitValue) {
        super({ msg, pattern: /^([A-Za-z0-9+_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/ });
    }
}
