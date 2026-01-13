import type { FC } from 'react';

import { cn } from '@/lib/utils.ts';
import '@/styles/retro-grid.css';

interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    angle?: number;
    cellSize?: string;
    opacity?: number;
    lineColor?: string;
}

export const RetroGrid: FC<RetroGridProps> = ({
    className,
    angle = 87,
    cellSize = '0.83rem',
    opacity = 1,
    lineColor = '#d90593',
    ...props
}) => {
    const gridStyles = {
        '--grid-angle': `${angle}deg`,
        '--cell-size': `${cellSize}`,
        '--opacity': opacity,
        '--line': lineColor,
    } as React.CSSProperties;

    return (
        <div
            className={cn(
                'absolute inset-0 pointer-events-none size-full overflow-hidden [perspective:250px]',
                'opacity-[var(--opacity)]',
                className,
            )}
            style={gridStyles}
            {...props}
        >
            <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
                <div className="animate-grid [background-image:linear-gradient(to_right,var(--line)_1px,transparent_0),linear-gradient(to_bottom,var(--line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-0% to-[#631890] to-50% from-transparent" />
        </div>
    );
};
