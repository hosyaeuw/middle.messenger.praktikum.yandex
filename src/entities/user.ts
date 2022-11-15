import { BASE_MEDIA_URL } from 'httpClient/api';

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
    role?: string;
}

class ABCUser {
    user;

    constructor(user: IProfile | IUser | IOpponent) {
        this.user = user;
    }

    get avatar() {
        if (!/http|https/.test(this.user?.avatar)) {
            return `${BASE_MEDIA_URL}${this.user?.avatar}`;
        }

        return 'https://www.mzpo-s.ru/images/teachers/prepodavatel.png';
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

    get id() {
        // @ts-ignore
        return this.user.id;
    }

    get displayName() {
        // @ts-ignore
        return this.user.display_name;
    }

    get login() {
        // @ts-ignore
        return this.user.login;
    }

    get email() {
        // @ts-ignore
        return this.user.email;
    }

    get phone() {
        // @ts-ignore
        return this.user.phone;
    }

    get role() {
        // @ts-ignore
        return this.user.role ?? 'regular';
    }
}
