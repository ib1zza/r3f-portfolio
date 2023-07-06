const prefix = "ib1zzaPortfolio/";

const getLocalStorage = <T>(key: string): T | null  => {
    return JSON.parse(localStorage.getItem(prefix + key) || "null");
}

const setLocalStorage = <T>(key: string, value: T) => {
    localStorage.setItem(prefix + key, JSON.stringify(value));
}

export const useLocalStorage = <T>(key: string, initialValue: T): [T,(value: T) => void] => {
    const value = getLocalStorage<T>(key) ?? initialValue;

    const setValue = (value: T) => {
        setLocalStorage(key, value);
    }

    return [value, setValue];
}