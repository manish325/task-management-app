import { useCallback, useEffect, useState } from 'react'

const LocalStorageKey = {
    COUNTRY_CODE: 'country-code',
    AUTH_TOKEN: 'auth-token',
    I18NEXT: 'i18nextLng',
    TEMP_AUTH_DATA: 'temp-auth',
} as const

type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey]

export const setLocalState = <T extends unknown>(
    key: LocalStorageKey,
    value: T,
    skipParsing: boolean = false
) => localStorage.setItem(key, skipParsing ? `${value}` : JSON.stringify(value))

export const hasLocalState = (key: LocalStorageKey) =>
    !!localStorage.getItem(key)

export const getLocalState = <T extends unknown>(
    key: LocalStorageKey,
    skipParsing: boolean = false
) => {
    if (hasLocalState(key)) {
        return skipParsing
            ? (localStorage.getItem(key)! as T)
            : (JSON.parse(localStorage.getItem(key)!) as T)
    }
    return undefined
}

export const removeLocalState = (key: LocalStorageKey) =>
    localStorage.removeItem(key)

const resetLocalState = () => localStorage.clear()

/**
 * useLocalState
 * @description This is a type safe implementation of localstorage module which serializes and deserializes with safety
 * @param {LocalStorageKey} `key` this key is the value refering which data will be store in local storage
 * @param {boolean} [skipParsing=false] `skipParsing` allow skipping of json parse in case of primitive types
 * @returns [state, setLocalStorage, unsetLocalState, resetLocalState]
 */
export const useLocalState = <T extends unknown>(
    key: LocalStorageKey,
    skipParsing: boolean = false
) => {
    const [state, setState] = useState<T | undefined>(
        getLocalState<T>(key, skipParsing)
    )

    useEffect(() => {
        if (!state) {
            removeLocalState(key);
        } else {
            setLocalState(key, state, skipParsing);
        }
    }, [key, skipParsing, state])

    const setLocalStorage = useCallback((value: T) => {
        setState(value);
        setLocalState(key, value);
    }, [])

    const unsetLocalState = useCallback(() => {
        removeLocalState(key);
        setState(undefined);
    }, [key])

    return [state, setLocalStorage, unsetLocalState, resetLocalState] as const
}
