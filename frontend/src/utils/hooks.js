import React, {useEffect} from 'react';

export default function useDeferredEffect(delay: number, effect: Function, deps: []): void {
    useEffect(
        () => {
            const handler = setTimeout(() => {
                effect()
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        deps
    );
}