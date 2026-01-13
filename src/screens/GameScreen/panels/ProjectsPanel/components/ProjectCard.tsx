import type { FC, PropsWithChildren } from 'react';

import * as TogglePrimitive from '@radix-ui/react-toggle';

import { type ProjectDto, ProjectDtoTypeEnum } from '@/api';
import { LightningIcon } from '@/components/icons/lightning.tsx';
import { MaskIcon } from '@/components/icons/mask.tsx';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/8bit/card.tsx';
import { CHAR_CHEVRON_RIGHT, CHAR_PLUS } from '@/constants/charCodes.ts';
import { useDeviceType } from '@/hooks/useDeviceType.ts';
import { formatPrice } from '@/lib/format.ts';
import { cn } from '@/lib/utils.ts';

import BoltImg from '/images/bolt-px.png';
import CoinImg from '/images/coin-px.png';
import FolderImg from '/images/folder-px.png';

interface ProjectCardProps extends PropsWithChildren {
    project: ProjectDto;
    isSelected: boolean;
    onClick: () => void;
    isExpanded?: boolean;
    className?: string;
}

const iconProjectSrc: Record<ProjectDtoTypeEnum, string> = {
    [ProjectDtoTypeEnum.marketing]: CoinImg,
    [ProjectDtoTypeEnum.techDebt]: BoltImg,
    [ProjectDtoTypeEnum.product]: FolderImg,
};

export const ProjectCard: FC<ProjectCardProps> = ({
    project,
    isExpanded,
    isSelected,
    onClick,
    children,
    className,
}) => {
    const { isMobile } = useDeviceType();
    const isTech = project.type === ProjectDtoTypeEnum.techDebt;

    return (
        <TogglePrimitive.Root className={className} onClick={onClick} pressed={isSelected}>
            <Card
                borderSize={isMobile ? 6 : 10}
                className={cn('bg-[#2e2e3d] h-full py-6 gap-0', {
                    'border-[#2e2e3d]': !isSelected,
                    'border-foreground': isSelected,
                })}
            >
                <div className={'flex w-full'}>
                    <img
                        src={iconProjectSrc[project.type]}
                        alt={''}
                        className={'size-20 ml-6 mr-4'}
                    />
                    <CardHeader className="flex flex-col space-y-2 flex-1">
                        <CardTitle className="w-full text-3xl text-start font-medium flex justify-between">
                            <span className={'line-clamp-2'}>{project?.name}</span>
                            {isExpanded && <span>{CHAR_CHEVRON_RIGHT}</span>}
                        </CardTitle>
                        <CardDescription className="flex gap-8 text-start text-lg text-muted-foreground">
                            {project?.description}
                        </CardDescription>
                        {project?.profits && isTech && (
                            <CardDescription className="flex gap-8 text-lg text-muted-foreground">
                                {Boolean(project.profits.speed) && (
                                    <div className={'flex gap-2'}>
                                        <LightningIcon className={'size-6'} />
                                        <span>
                                            {project.profits.speed > 0
                                                ? `${CHAR_PLUS}${project.profits.speed}`
                                                : `${project.profits.speed}`}
                                        </span>
                                    </div>
                                )}
                                {Boolean(project.profits.techDebt) && (
                                    <div className={'flex gap-2'}>
                                        <MaskIcon className={'size-6'} />
                                        <span>
                                            {project.profits.techDebt > 0
                                                ? `${CHAR_PLUS}${project.profits.techDebt}`
                                                : `${project.profits.techDebt}`}
                                        </span>
                                    </div>
                                )}
                                {Boolean(project.profits.cash) && (
                                    <div className={'flex gap-2'}>
                                        <span>
                                            {project.profits.cash > 0 ? CHAR_PLUS : ''}
                                            {formatPrice(project.profits.cash, {
                                                useGrouping: false,
                                            })}
                                        </span>
                                    </div>
                                )}
                            </CardDescription>
                        )}
                        <div className={'mt-6 text-2xl self-end text-right'}>{children}</div>
                    </CardHeader>
                </div>
            </Card>
        </TogglePrimitive.Root>
    );
};
