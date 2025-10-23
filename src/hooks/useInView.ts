'use client';
import {useEffect, useRef, useState} from 'react';

export function useInView<T extends HTMLElement>(
    options?: IntersectionObserverInit
) {
    const ref = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            {threshold: 0.2, ...options}
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [options]);

    return {ref, isVisible};
}