import { useEffect, useState } from 'react';

/**
 * Like useState, but the value is remembered in localStorage so it survives
 * page changes and app restarts.
 */
export const useStickyState = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    if (stored === null) return initialValue;

    try {
      return JSON.parse(stored) as T;
    } catch {
      console.warn(`Discarded invalid stored value for "${key}":`, stored);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
