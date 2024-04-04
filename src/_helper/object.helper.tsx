import * as obj from '../_lib/obj/KeyTo';
import * as arr from '../_lib/obj/ArrayTo';
/**
import { uuidService } from '../_lib/indentification/uuid';

export const getUUID = (): string => {
    return uuidService.call().getUUIDv4();
}
 */

/**
 * 
 * @param org {[key: string]: object}
 * @param add string | number | object
 * @param key string
 * @param initial object
 * @returns 
 */
export const addObject = (
    org: {[key: string]: object},
    add: object,
    key: string,
    initial: object
): {[key: string]: object} => {
    return obj.add<object>(org, add, key, initial);
};

/**
 * 
 * @param org {[key: string]: object}
 * @param key string
 * @returns 
 */
export const delObject = 
(
    org: {[key: string]: object},
    key: string
): {[key: string]: object} => {
    return obj.del<object>(org, key);
};

/**
 * 
 * @param org {[key: string]: object}
 * @param up object
 * @param key string
 * @returns object[]
 */
export const updateObject = 
(
    org: {[key: string]: object},
    key: string,
    up: object
): {[key: string]: object} => {
    return obj.update<object>(org, key, up);
};

/**
 * 
 * @param org 
 * @param key 
 * @param search 
 * @param up 
 * @returns 
 */
export const searchUpdateObject = 
(
    org: {[key: string | number]: object},
    key: string,
    search: string,
    up: object
): {[key: string | number]: object} => {
    const _org = duplicator(org);
    const index = obj.search<string>(org, key, search);
    _org[index] = up;
    return _org;
};

/**
 * 配列に要素を追加したものを返す
 * 
 * @param org Array<string | number | object>
 * @param val string | number | object
 * @param initial Array<string | number | object>
 * @returns Array<string | number | object>
 */
export const addArray = 
<T extends string | number | object>
(
    org: Array<T>,
    val: T,
    initial: Array<T>
): Array<T> => {
    return arr.add(org, val, initial);
};

/**
 * 配列の要素を削除し返す
 * indexに-1を指定した場合、要素を検索し削除
 * @param org Array<string | number | object>
 * @param index number
 * @param search string | number | object
 * 
 * @returns Array<string | number | object>
 */
export const delArray = 
<T extends string | number | object>
(
    org     : Array<T>,
    index   : number,
    search? : T
): Array<T> => {
    return arr.del(org, index, search);
};

/**
 * 配列の要素を更新し返す
 * @param org Array<string | number | object>
 * @param index number
 * @param up string | number | object
 * @returns Array<string | number | object>
 */
export const updateArray = 
<T extends string | number | object>
(
    org: Array<T>,
    index: number,
    up: T
): Array<T> => {
    return arr.update(org, index, up);
};

/**
 * 配列、オブジェクトを複製
 * @param org Array<string | number | object> | object
 * @returns Array<string | number | object> | object
 */
export const duplicator = 
<T extends Array<string | number | object> | { [key:string]: object | string | number | boolean }>
(
    org: T
): T => {
    if (Array.isArray(org)) {
        // return org.concat() as T
        return JSON.parse(JSON.stringify(org)) as T
    }
    return Object.assign({}, JSON.parse(JSON.stringify(org)))
}

/**
 * 対象の配列、オブジェクトが一致しているか
 * @param {T} object | Array<string | number>
 * @param {org} T 
 * @param {target} T
 * @returns boolean
 */
export const consistent = 
<T extends object | Array<string | number>>(
    org: T,
    target: T
): boolean => {
    return JSON.stringify(org) === JSON.stringify(target) ? true : false;
}