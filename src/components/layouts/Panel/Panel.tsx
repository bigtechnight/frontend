import { type FC, type PropsWithChildren } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { GridBeams } from '@/components/shaders/grid-beams.tsx';
import { cn } from '@/lib/utils.ts';

const bgVariants = cva(
    'flex flex-col flex-1 h-full w-full relative overflow-x-hidden overflow-y-auto px-8',
    {
        variants: {
            variant: {
                gradient: 'bg-gradient-to-t from-[#21222f] to-[#191919]',
                primary: 'bg-[#7f5fff]',
                transparent: 'bg-transparent',
            },
            space: {
                none: '',
                layout: 'pt-[var(--header-height)] pb-[var(--header-height)]',
            },
        },
        defaultVariants: {
            variant: 'gradient',
            space: 'layout',
        },
    },
);

interface PanelProps extends VariantProps<typeof bgVariants>, PropsWithChildren {
    innerRef?: React.Ref<HTMLDivElement>;
    mode?: 'beams';
}

const Panel: FC<PanelProps> = ({ children, variant, space, mode, innerRef }) => {
    if (mode === 'beams') {
        return (
            <GridBeams
                gridSize={40}
                gridColor="rgba(255, 255, 255, 0.2)"
                rayCount={20}
                rayOpacity={0.95}
                raySpeed={2.5}
                rayLength="50vh"
                gridFadeStart={5}
                gridFadeEnd={90}
                className={cn(bgVariants({ variant, space }))}
            >
                {children}
            </GridBeams>
        );
    }
    return (
        <div ref={innerRef} data-node={'panel'} className={cn(bgVariants({ variant, space }))}>
            {children}
        </div>
    );
};

export default Panel;
