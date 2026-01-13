import { useEffect, useRef } from 'react';

type UseAutoScrollParams = {
    smooth?: boolean;
    useWindow?: boolean;
};

export function useScrollBottom<T extends HTMLElement>({
    smooth = true,
    useWindow = false,
}: UseAutoScrollParams) {
    const containerRef = useRef<T>(null);

    useEffect(() => {
        const targetNode = useWindow ? document.body : containerRef.current;

        if (!targetNode) return;

        const observer = new MutationObserver(() => {
            if (useWindow) {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: smooth ? 'smooth' : 'auto',
                });
            } else {
                targetNode.scrollTo({
                    top: targetNode.scrollHeight,
                    behavior: smooth ? 'smooth' : 'auto',
                });
            }
        });

        observer.observe(targetNode, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, [smooth, useWindow]);

    return useWindow ? null : containerRef;
}
