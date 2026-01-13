import { Children, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { motion, type MotionProps, useInView } from 'framer-motion';

import { cn } from '@/lib/utils';

interface SequenceContextValue {
    completeItem: (index: number) => void;
    activeIndex: number;
    sequenceStarted: boolean;
}

const SequenceContext = createContext<SequenceContextValue | null>(null);

const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext<number | null>(null);
const useItemIndex = () => useContext(ItemIndexContext);

interface AnimatedSpanProps extends MotionProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    startOnView?: boolean;
}

export const AnimatedSpan = ({
    children,
    delay = 0,
    className,
    startOnView = false,
    ...props
}: AnimatedSpanProps) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const sequence = useSequence();
    const itemIndex = useItemIndex();
    const [hasStarted, setHasStarted] = useState(false);
    const isInView = useInView(elementRef as React.RefObject<Element>, {
        amount: 0.3,
        once: true,
    });

    useEffect(() => {
        if (!sequence || itemIndex === null) return;
        if (!sequence.sequenceStarted) return;
        if (hasStarted) return;
        if (sequence.activeIndex === itemIndex) {
            setHasStarted(true);
        }
    }, [sequence, hasStarted, itemIndex]);

    const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true;

    return (
        <motion.div
            ref={elementRef}
            initial={{ opacity: 0, y: -5 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
            transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
            className={cn('grid text-sm font-normal tracking-tight', className)}
            onAnimationComplete={() => {
                if (!sequence) return;
                if (itemIndex === null) return;
                sequence.completeItem(itemIndex);
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

interface TypingAnimationProps extends MotionProps {
    children: string;
    className?: string;
    duration?: number;
    delay?: number;
    as?: React.ElementType;
    startOnView?: boolean;
}

export const TypingAnimation = ({
    children,
    className,
    duration = 20,
    delay = 0,
    as: Component = 'div',
    startOnView = true,
    ...props
}: TypingAnimationProps) => {
    if (typeof children !== 'string') {
        throw new Error('TypingAnimation: children must be a string. Received:');
    }

    const MotionComponent = useMemo(
        () =>
            motion.create(Component, {
                forwardMotionProps: true,
            }),
        [Component],
    );

    const [displayedText, setDisplayedText] = useState<string>('');
    const [started, setStarted] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(elementRef as React.RefObject<Element>, {
        amount: 0.3,
        once: true,
    });

    const sequence = useSequence();
    const itemIndex = useItemIndex();

    useEffect(() => {
        if (sequence && itemIndex !== null) {
            if (!sequence.sequenceStarted) return;
            if (started) return;
            if (sequence.activeIndex === itemIndex) {
                setStarted(true);
            }
            return;
        }

        if (!startOnView) {
            const startTimeout = setTimeout(() => setStarted(true), delay);
            return () => clearTimeout(startTimeout);
        }

        if (!isInView) return;

        const startTimeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimeout);
    }, [delay, startOnView, isInView, started, sequence, itemIndex]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < children.length) {
                setDisplayedText(children.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingEffect);
                if (sequence && itemIndex !== null) {
                    sequence.completeItem(itemIndex);
                }
            }
        }, duration);

        return () => {
            clearInterval(typingEffect);
        };
    }, [children, duration, started]);

    return (
        <MotionComponent
            ref={elementRef}
            className={cn('text-sm font-normal tracking-tight', className)}
            {...props}
        >
            {displayedText}
            {!started && (
                <div aria-hidden={'true'} style={{ opacity: 0 }}>
                    {children}
                </div>
            )}
        </MotionComponent>
    );
};

interface TerminalProps {
    children: React.ReactNode;
    className?: string;
    sequence?: boolean;
    startOnView?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
    delay?: number;
}

export const Terminal = ({
    children,
    className,
    sequence = true,
    startOnView = false,
    innerRef,
    delay = 0,
}: TerminalProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef as React.RefObject<Element>, {
        amount: 0.3,
        once: true,
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [sequenceStarted, setSequenceStarted] = useState(false);

    const contextValue = useMemo<SequenceContextValue | null>(() => {
        if (!sequence) return null;
        return {
            completeItem: (index: number) => {
                setActiveIndex((current) => (index === current ? current + 1 : current));
            },
            activeIndex,
            sequenceStarted,
        };
    }, [sequence, activeIndex, sequenceStarted]);

    const wrappedChildren = useMemo(() => {
        if (!sequence) return children;
        const array = Children.toArray(children);

        if (!sequenceStarted) return null;

        return array.map((child, index) => {
            if (!sequenceStarted && index > 0) return null;

            if (sequenceStarted && index > activeIndex) return null;

            return (
                <ItemIndexContext.Provider key={index} value={index}>
                    {child as React.ReactNode}
                </ItemIndexContext.Provider>
            );
        });
    }, [activeIndex, children, sequence, sequenceStarted]);

    useEffect(() => {
        if (!sequence) return;

        const shouldStart = !startOnView || isInView;

        if (shouldStart) {
            const timer = setTimeout(() => {
                setSequenceStarted(true);
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
    }, [isInView, startOnView, delay, sequence]);

    const content = (
        <div
            ref={containerRef}
            className={cn(
                'noise-bg flex flex-col z-0 w-full h-full border-4 border-border bg-background',
                className,
            )}
        >
            <div className="flex flex-col gap-y-2 border-b-4 border-border p-4">
                <div className="flex flex-row gap-x-2">
                    <div className="h-2 w-2 bg-red-500"></div>
                    <div className="h-2 w-2 bg-yellow-500"></div>
                    <div className="h-2 w-2 bg-green-500"></div>
                </div>
            </div>
            <div ref={innerRef} className="overflow-x-hidden overflow-y-auto p-4">
                <div className="grid gap-1">{wrappedChildren}</div>
            </div>
        </div>
    );

    if (!sequence) return content;

    return <SequenceContext.Provider value={contextValue}>{content}</SequenceContext.Provider>;
};
