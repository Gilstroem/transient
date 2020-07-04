/**
 * Subscribe to updates on data. Updates on insertion and deletion
 * at the end of the insertions lifetime.
 *
 * @param {string} [key = transient] - the namespace of the transient data. If no key is specified, a default key is used.
 */
declare function useTransient(key: string): any[];
export default useTransient;
/**
 * Insert a piece of transient data of any type, with
 * a lifetype denoting how long it lives.
 *
 * @param {Any} data - the transient data to be inserted.
 * @param {number} [lifetime = 5000] - the lifetime in milliseconds. Optional - defaults to 5000.
 * @param {string} [key = transient] - the namespace of the transient data. If no key is specified, a default key is used.
 */
export declare function insert(data: any, lifetime?: number, key?: string): void;
