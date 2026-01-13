import { useEffect, useRef, useState } from 'react';

import { motion, type MotionProps, useInView } from 'framer-motion';

interface TypingAnimationProps extends MotionProps {
    children: string;
    className?: string;
    duration?: number;
    // in seconds
    delay?: number;
    as?: React.ElementType;
    startOnView?: boolean;
}

export function TypingAnimation({
    children,
    className,
    duration = 10,
    delay = 0,
    as: Component = 'div',
    startOnView = false,
    ...props
}: TypingAnimationProps) {
    const MotionComponent = motion.create(Component, {
        forwardMotionProps: true,
    });
    const [displayedText, setDisplayedText] = useState<string>('');
    const [started, setStarted] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);
    const [fixedHeight, setFixedHeight] = useState<number | undefined>(undefined);
    const isInView = useInView(elementRef as React.RefObject<Element>, {
        amount: 0.3,
        once: true,
    });

    useEffect(() => {
        if (!elementRef.current) return;

        const temp = document.createElement('div');
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        temp.style.width = `${elementRef.current.clientWidth}px`;
        temp.style.font = window.getComputedStyle(elementRef.current).font;
        temp.style.whiteSpace = 'pre-wrap';
        temp.innerText = children;
        document.body.appendChild(temp);
        setFixedHeight(temp.offsetHeight);
        document.body.removeChild(temp);
    }, [children]);

    useEffect(() => {
        if (!startOnView) {
            const startTimeout = setTimeout(() => {
                setStarted(true);
            }, delay * 1000);
            return () => clearTimeout(startTimeout);
        }

        if (!isInView) return;

        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [delay, isInView, startOnView]);

    useEffect(() => {
        if (!started) return;

        const graphemes = Array.from(children);
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < graphemes.length) {
                setDisplayedText(graphemes.slice(0, i + 1).join(''));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, duration);

        return () => clearInterval(typingEffect);
    }, [children, duration, started]);

    return (
        <MotionComponent
            ref={elementRef}
            className={className}
            style={fixedHeight ? { minHeight: `${fixedHeight}px` } : undefined}
            {...props}
        >
            {displayedText}
        </MotionComponent>
    );
}
