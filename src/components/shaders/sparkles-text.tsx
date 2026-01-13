import { type CSSProperties, type ReactElement, useEffect, useState } from 'react';

import { motion } from 'framer-motion';

interface Sparkle {
    id: string;
    x: string;
    y: string;
    color: string;
    delay: number;
    scale: number;
    lifespan: number;
    type: number;
}

interface SparkleProps {
    width: number;
    height: number;
    viewBox: string;
    pathD: string;
}

const Sparkle: React.FC<Sparkle> = ({ id, x, y, color, delay, scale, type }) => {
    const { pathD, ...svgProps } = (() => {
        switch (type) {
            case 1: {
                return {
                    width: 5,
                    height: 5,
                    viewBox: '0 0 5 5',
                    pathD: 'M4.7998 4.80078H0V0H4.7998V4.80078Z',
                };
            }
            case 2: {
                return {
                    width: 15,
                    height: 15,
                    viewBox: '0 0 15 15',
                    pathD: 'M9.59961 14.4004H4.7998V9.60059H9.59961V14.4004ZM4.7998 9.60059H0V4.7998H4.7998V9.60059ZM14.4004 9.60059H9.59961V4.7998H14.4004V9.60059ZM9.59961 4.7998H4.7998V0H9.59961V4.7998Z',
                };
            }
            case 3: {
                return {
                    width: 24,
                    height: 24,
                    viewBox: '0 0 24 24',
                    pathD: 'M14.4004 24H9.59961V14.4004H0V9.59961H9.59961V0H14.4004V9.59961H23.4004V14.4004H14.4004V24Z',
                };
            }
            default: {
                return {} as SparkleProps;
            }
        }
    })();

    return (
        <motion.svg
            key={id}
            className="pointer-events-none absolute z-20"
            initial={{ opacity: 0, left: x, top: y }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, scale, 0],
                rotate: [75, 120, 150],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay }}
            {...svgProps}
        >
            <path d={pathD} fill={color} />
        </motion.svg>
    );
};

interface SparklesTextProps {
    as?: ReactElement;
    className?: string;
    children: React.ReactNode;
    sparklesCount?: number;
    colors?: {
        first: string;
        second: string;
    };
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const SparklesText: React.FC<SparklesTextProps> = ({
    children,
    colors = { first: '#9E7AFF', second: '#FE8BBB' },
    className,
    sparklesCount = 10,
    ...props
}) => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const generateStar = (): Sparkle => {
            const starX = `${Math.random() * 100}%`;
            const starY = `${Math.random() * 100}%`;
            const color = Math.random() > 0.5 ? colors.first : colors.second;
            const delay = Math.random() * 2;
            const scale = Math.random() * 1 + 0.5;
            const lifespan = Math.random() * 10 + 1;
            const id = `${starX}-${starY}-${Date.now()}`;
            const type = getRandomNumber(1, 3);
            return { id, x: starX, y: starY, color, delay, scale, lifespan, type };
        };

        const initializeStars = () => {
            const newSparkles = Array.from({ length: sparklesCount }, generateStar);
            setSparkles(newSparkles);
        };

        const updateStars = () => {
            setSparkles((currentSparkles) =>
                currentSparkles.map((star) => {
                    if (star.lifespan <= 0) {
                        return generateStar();
                    } else {
                        return { ...star, lifespan: star.lifespan - 0.1 };
                    }
                }),
            );
        };

        initializeStars();
        const interval = setInterval(updateStars, 100);

        return () => clearInterval(interval);
    }, [colors.first, colors.second, sparklesCount]);

    return (
        <div
            className={className}
            {...props}
            style={
                {
                    '--sparkles-first-color': `${colors.first}`,
                    '--sparkles-second-color': `${colors.second}`,
                } as CSSProperties
            }
        >
            <span className="relative inline-block pointer-events-none z-10 whitespace-pre-wrap">
                {sparkles.map((sparkle) => (
                    <Sparkle key={sparkle.id} {...sparkle} />
                ))}

                {children}
            </span>
        </div>
    );
};
