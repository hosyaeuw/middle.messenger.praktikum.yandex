import Pattern from './Pattern';

type PasswordValidatorInitValue = {
    msg: string;
};

class Password extends Pattern {
    constructor({ msg }: PasswordValidatorInitValue) {
        super({ msg, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/ });
    }
}

export default Password;
