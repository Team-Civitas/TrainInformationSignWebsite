import { useState, useEffect } from 'react';

export default function usePersistentState(
    key,
    defaultsMap = {},
    parse = JSON.parse,
    serialize = JSON.stringify
) {
    const fallback = defaultsMap[key];

    const [state, setState] = useState(() => {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            try {
                return parse(stored);
            } catch {
                return fallback;
            }
        }
        return fallback;
    });

    useEffect(() => {
        localStorage.setItem(key, serialize(state));
    }, [key, state, serialize]);

    return [state, setState];
}
