declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
    export interface DOMEvent<T extends EventTarget> extends Event {
        readonly target: T;
    }

    export type anyObj = Record<string, any>;

    declare module '*.jpg' {
        const path: string;
        export default path;
    }

    declare module '*.png' {
        const path: string;
        export default path;
    }
}

export {};
