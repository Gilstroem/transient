class Store<T> {
  __transients: Map<number, T>;
  __subscribers: { (transient: T[]): void }[];
  __nextId: number;

  constructor() {
    this.__transients = new Map();
    this.__subscribers = [];
    this.__nextId = 0;
  }

  subscribe(cb: { (transient: T[]): void }) {
    this.__subscribers.push(cb);
  }

  hasSubscribers(): boolean {
    return this.__subscribers.length !== 0;
  }

  unsubscribe(cb: { (transientStrings: T[]): void }) {
    const callbackIndex = this.__subscribers.indexOf(cb);
    if (callbackIndex >= 0) {
      this.__subscribers = this.__subscribers
        .slice(0, callbackIndex)
        .concat(this.__subscribers.slice(callbackIndex + 1));
    }
  }

  insert(data: T, lifetime: number) {
    const id = this.__nextId;
    this.incrementId();
    this.__transients.set(id, data);
    this.emitUpdate();

    setTimeout(() => {
      this.__transients.delete(id);
      this.emitUpdate();
    }, lifetime);
  }

  private emitUpdate() {
    this.__subscribers.forEach((callback) =>
      callback(Array.from(this.__transients.values()))
    );
  }

  private incrementId() {
    this.__nextId = this.__nextId + 1;
  }
}

export default class Stores {
  __stores: Map<string, Store<unknown>>;

  constructor() {
    this.__stores = new Map();
  }

  subscribe<T>(
    cb: { (transientStrings: T[]): void },
    key: string = "__DEFAULT"
  ) {
    const store = this.__stores.get(key);
    if (store) {
      store.subscribe(cb);
    } else {
      const newStore = new Store<T>();
      newStore.subscribe(cb);
      this.__stores.set(key, newStore);
    }
  }

  unsubscribe<T>(key: string = "__DEFAULT", cb: { (transient: T[]): void }) {
    const store = this.__stores.get(key);
    if (store) {
      store.unsubscribe(cb);

      // Delete store if no one is subscribed
      if (store.hasSubscribers()) {
        this.__stores.delete(key);
      }
    }
  }

  insert<T>(data: T, lifetime: number = 5000, key: string = "__DEFAULT") {
    const store = this.__stores.get(key);
    if (store) {
      store.insert(data, lifetime);
    }
  }
}
