import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

import { TypingAnimation } from '@/components/shaders/terminal.tsx';
import { Alert, AlertDescription } from '@/components/ui/8bit/alert.tsx';

const HIGHLIGHT_Z_INDEX = 10000;

const GuidedTour: React.FC<{
    steps: {
        targetRef: React.RefObject<any>;
        content: string;
    }[];
    isVisible?: boolean;
    onClose?: () => void;
}> = ({ steps, isVisible, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [highlightStyle, setHighlightStyle] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });
    const [tooltipCoords, setTooltipCoords] = useState({ top: 0, left: 0 });
    const [originalStyle, setOriginalStyle] = useState({
        position: '',
        zIndex: '',
        pointerEvents: '',
    });

    const tooltipRef = useRef<HTMLDivElement>(null);
    const step = steps[currentStep];
    const targetEl = step?.targetRef?.current;

    // 💡 Применяем z-index к целевому элементу
    useEffect(() => {
        if (!targetEl) return;

        const prev = {
            position: targetEl.style.position,
            pointerEvents: targetEl.style.pointerEvents,
            zIndex: targetEl.style.zIndex,
        };

        setOriginalStyle(prev);

        if (getComputedStyle(targetEl).position === 'static') {
            targetEl.style.position = 'relative';
        }
        targetEl.style.zIndex = HIGHLIGHT_Z_INDEX;
        targetEl.style.pointerEvents = 'none';

        const updatePosition = () => {
            const rect = targetEl.getBoundingClientRect();
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;
            const highlight = {
                top: rect.top + scrollY,
                left: rect.left + scrollX,
                width: rect.width,
                height: rect.height,
            };

            setHighlightStyle(highlight);

            requestAnimationFrame(() => {
                if (tooltipRef.current) {
                    const tooltipRect = tooltipRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    const spaceBelow = viewportHeight - rect.bottom;
                    const tooltipHeight = tooltipRect.height;

                    const position = spaceBelow < tooltipHeight + 16 ? 'top' : 'bottom';

                    const top =
                        position === 'bottom'
                            ? highlight.top + highlight.height + 8
                            : highlight.top - tooltipHeight - 8;

                    const left = highlight.left;

                    setTooltipCoords({ top, left });
                }
            });
        };

        updatePosition();

        window.addEventListener('resize', updatePosition);

        return () => {
            targetEl.style = prev;
            setOriginalStyle(prev);
            window.removeEventListener('resize', updatePosition);
        };
    }, [targetEl]);

    useEffect(() => {
        if (!targetEl) return;

        if (!isVisible) {
            targetEl.style = originalStyle;
        }
    }, [isVisible, targetEl, originalStyle]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            onClose?.();
        }
    };

    if (!isVisible || !tooltipCoords) return null;

    return createPortal(
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.4 }}>
            <div className="fixed z-[9999] inset-0 bg-background/80" onClick={handleNext} />
            <div
                className="absolute z-[10001] pointer-events-none border-4 border-secondary transition-all duration-200"
                style={highlightStyle}
            />
            <div
                ref={tooltipRef}
                className="fixed z-[10002] pointer-events-auto bottom-0 mx-6 mb-10 items-start space-x-2"
            >
                <Alert className={'bg-background border-10 p-3 border-secondary'}>
                    <AlertDescription>
                        <TypingAnimation
                            duration={10}
                            className="text-2xl text-secondary whitespace-pre-line"
                        >
                            {step.content}
                        </TypingAnimation>
                    </AlertDescription>
                </Alert>
            </div>
        </motion.div>,
        document.body,
    );
};

export { GuidedTour };
