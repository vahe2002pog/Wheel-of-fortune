import { useState, useEffect } from 'react';
import { STORE_KEY } from '../helpers/constants';
const getStoreKey = (key: string) => `${STORE_KEY}-${key}`;

export const useLocalStorage = <T,>(key: string, initialValue: T): [T, (v: T) => void] => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(getStoreKey(key));
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(getStoreKey(key), JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
