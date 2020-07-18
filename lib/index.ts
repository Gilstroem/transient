import { useState, useEffect } from "react";
import Stores from "./stores";

const stores = new Stores();

/**
 * Subscribe to updates on data. Updates on insertion and deletion
 * at the end of the insertions lifetime.
 *
 * @param {string} [key = __DEFAULT] - the namespace of the transient data. If no key is specified, a default key is used.
 */
function useTransient<T>(key: string): T[] {
  const [transient, setTransient] = useState<Array<T>>([]);

  useEffect(() => {
    stores.subscribe<T>(setTransient, key);
    return () => stores.unsubscribe<T>(key, setTransient);
  }, [key]);

  return transient;
}

export default useTransient;

/**
 * Insert a piece of transient data of any type, with
 * a lifetype denoting how long it lives.
 *
 * @param {Any} data - the transient data to be inserted.
 * @param {number} [lifetime = 5000] - the lifetime in milliseconds. Optional - defaults to 5000.
 * @param {string} [key = __DEFAULT] - the namespace of the transient data. If no key is specified, a default key is used.
 */
export function insert<T>(data: T, lifetime?: number, key?: string): void {
  stores.insert(data, lifetime, key);
}
