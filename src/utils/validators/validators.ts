import { Email } from "./Email";
import { Login } from "./Login";
import { Name } from "./Name";
import { Password } from "./Password";
import { Phone } from "./Phone";
import { Range } from "./Range";
import { Require } from "./Require";

export const messages = {
    email: 'Incorrect email',
    login: 'Incorrect login',
    name: 'Incorrect name',
    phone: 'Incorrect phone',
    range: 'Invalid number of characters',
    require: 'This field is required',
    password: 'The password must contain at least one number and an uppercase letter',
};

export const passwordValidators = () => [
    new Require({ msg: messages.require }),
    new Password({
        msg: messages.password,
    }),
    new Range({
        min: 8,
        max: 40,
        msg: messages.range,
    }),
];

export const loginValidators = () => [
    new Login({
        msg: messages.login,
    }),
    new Range({
        msg: messages.range,
        min: 2,
    }),
];

export const emailValidators = () => [
    new Email({
        msg: messages.email,
    }),
];

export const nameValidators = () => [
    new Range({
        msg: messages.range,
        min: 2,
    }),
    new Name({
        msg: messages.name,
    }),
];

export const displayNameValidators = () => [
    new Range({
        msg: messages.range,
        min: 2,
    }),
];

export const phoneValidators = () => [
    new Phone({
        msg: messages.phone,
    }),
];

export const chatTitleValidators = () => [
    new Range({
        msg: messages.range,
        min: 2,
        max: 255,
    }),
];

export const messageValidators = () => [new Require({ msg: messages.require })];
