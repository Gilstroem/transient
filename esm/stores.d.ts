declare class Store<T> {
    __transients: Map<number, T>;
    __subscribers: {
        (transient: T[]): void;
    }[];
    __nextId: number;
    constructor();
    subscribe(cb: {
        (transient: T[]): void;
    }): void;
    hasSubscribers(): boolean;
    unsubscribe(cb: {
        (transientStrings: T[]): void;
    }): void;
    insert(data: T, lifetime: number): void;
    private emitUpdate;
    private incrementId;
}
export default class Stores {
    __stores: Map<string, Store<unknown>>;
    constructor();
    subscribe<T>(cb: {
        (transientStrings: T[]): void;
    }, key?: string): void;
    unsubscribe<T>(key: string, cb: {
        (transient: T[]): void;
    }): void;
    insert<T>(data: T, lifetime?: number, key?: string): void;
}
export {};
