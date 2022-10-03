export interface IOpponent {
    first_name: string;
    second_name: string;
    avatar: string;
}

export interface IUser extends IOpponent {
    email: string;
    login: string;
    phone: string;
}

export interface IProfile extends IUser {
    id: number;
    display_name: string;
}

class ABCUser {
    user;

    constructor(user: IProfile | IUser | IOpponent) {
        this.user = user;
    }

    get avatar() {
        return this.user.avatar;
    }

    get firstName() {
        return this.user.first_name;
    }

    get secondName() {
        return this.user.second_name;
    }

    get fullName() {
        return `${this.user.second_name} ${this.user.first_name}`;
    }
}

export class User extends ABCUser {
    constructor(user: IUser) {
        super(user);
    }
}

export class Opponent extends ABCUser {
    constructor(user: IOpponent) {
        super(user);
    }
}

export class Profile extends ABCUser {
    constructor(user: IProfile) {
        super(user);
    }

    get displayName() {
        return this.user.display_name;
    }

    get login() {
        return this.user.login;
    }

    get email() {
        return this.user.email;
    }

    get phone() {
        return this.user.phone;
    }
}
