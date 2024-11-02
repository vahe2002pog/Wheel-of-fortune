import { useState, useEffect } from 'react';
import { STORE_KEY } from '../helpers/constants';
const getStoreKey = (key: string) => `${STORE_KEY}-${key}`;

export function getStoreValue<T>(key: string, initialValue: T): T {
    const storedValue = localStorage.getItem(getStoreKey(key));
    return storedValue ? JSON.parse(storedValue) : initialValue;
}

export const useLocalStorage = <T,>(key: string, initialValue: T): [T, (v: T) => void] => {
    const [value, setValue] = useState(() => getStoreValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(getStoreKey(key), JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
