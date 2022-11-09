import { Pattern } from './Pattern';

type PasswordValidatorInitValue = {
    msg: string;
};

export class Login extends Pattern {
    constructor({ msg }: PasswordValidatorInitValue) {
        super({ msg, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ });
    }
}
