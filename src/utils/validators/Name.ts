import { Pattern } from './Pattern';

type NameValidatorInitValue = {
    msg: string;
};

export class Name extends Pattern {
    constructor({ msg }: NameValidatorInitValue) {
        super({ msg, pattern: /^[A-ZА-Я][а-яa-z-]*[а-яa-z]$/ });
    }
}
