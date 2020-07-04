declare class Store {
    __transients: Map<number, any>;
    __subscribers: {
        (transientStrings: string[]): void;
    }[];
    __nextId: number;
    constructor();
    subscribe(cb: {
        (transientStrings: string[]): void;
    }): void;
    hasSubscribers(): boolean;
    unsubscribe(cb: {
        (transientStrings: string[]): void;
    }): void;
    insert(data: any, lifetime: number): void;
    private emitUpdate;
    private incrementId;
}
export default class Stores {
    __stores: Map<string, Store>;
    constructor();
    subscribe(cb: {
        (transientStrings: string[]): void;
    }, key?: string): void;
    unsubscribe(key: string, cb: {
        (transientStrings: string[]): void;
    }): void;
    insert(data: any, lifetime?: number, key?: string): void;
}
export {};
