var Store = /** @class */ (function () {
    function Store() {
        this.__transients = new Map();
        this.__subscribers = [];
        this.__nextId = 0;
    }
    Store.prototype.subscribe = function (cb) {
        this.__subscribers.push(cb);
    };
    Store.prototype.hasSubscribers = function () {
        return this.__subscribers.length !== 0;
    };
    Store.prototype.unsubscribe = function (cb) {
        var callbackIndex = this.__subscribers.indexOf(cb);
        if (callbackIndex >= 0) {
            this.__subscribers = this.__subscribers
                .slice(0, callbackIndex)
                .concat(this.__subscribers.slice(callbackIndex + 1));
        }
    };
    Store.prototype.insert = function (data, lifetime) {
        var _this = this;
        var id = this.__nextId;
        this.incrementId();
        this.__transients.set(id, data);
        this.emitUpdate();
        setTimeout(function () {
            _this.__transients.delete(id);
            _this.emitUpdate();
        }, lifetime);
    };
    Store.prototype.emitUpdate = function () {
        var _this = this;
        this.__subscribers.forEach(function (callback) {
            return callback(Array.from(_this.__transients.values()));
        });
    };
    Store.prototype.incrementId = function () {
        this.__nextId = this.__nextId + 1;
    };
    return Store;
}());
var Stores = /** @class */ (function () {
    function Stores() {
        this.__stores = new Map();
    }
    Stores.prototype.subscribe = function (cb, key) {
        if (key === void 0) { key = "__DEFAULT"; }
        var store = this.__stores.get(key);
        if (store) {
            store.subscribe(cb);
        }
        else {
            var newStore = new Store();
            newStore.subscribe(cb);
            this.__stores.set(key, newStore);
        }
    };
    Stores.prototype.unsubscribe = function (key, cb) {
        if (key === void 0) { key = "__DEFAULT"; }
        var store = this.__stores.get(key);
        if (store) {
            store.unsubscribe(cb);
            // Delete store if no one is subscribed
            if (store.hasSubscribers()) {
                this.__stores.delete(key);
            }
        }
    };
    Stores.prototype.insert = function (data, lifetime, key) {
        if (lifetime === void 0) { lifetime = 5000; }
        if (key === void 0) { key = "__DEFAULT"; }
        var store = this.__stores.get(key);
        if (store) {
            store.insert(data, lifetime);
        }
    };
    return Stores;
}());
export default Stores;
