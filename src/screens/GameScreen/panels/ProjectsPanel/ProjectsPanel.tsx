import { type FC, useEffect, useMemo, useRef, useState } from 'react';

import type { GamePanelComponentProps } from '@/screens/GameScreen/types/GamePanelComponentProps.ts';

import { type ProjectDto, ProjectDtoTypeEnum } from '@/api';
import { useGameData } from '@/atoms/gameDataAtom.ts';
import { useGameState } from '@/atoms/gameStateAtom.ts';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { GuidedTour } from '@/components/ui/guided-tour.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { formatPrice } from '@/lib/format.ts';
import { StepIndicator } from '@/screens/GameScreen/components/StepIndicator/StepIndicator.tsx';
import { ProjectCard } from '@/screens/GameScreen/panels/ProjectsPanel/components/ProjectCard.tsx';

const ProjectsPanel: FC<GamePanelComponentProps> = ({ gameSelect }) => {
    const gameData = useGameData();
    const currentState = useGameState();
    const [isPending, setIsPending] = useState(false);

    const currentRound = gameData?.rounds.find((round) => round.id === currentState.currentRoundId);
    const currentRoundIndex = gameData?.rounds.findIndex(
        (round) => round.id === currentState.currentRoundId,
    );
    const currentProjects = currentRound?.projects || [];

    const mainProjects = Object.values(
        currentProjects
            .filter((i) => i.type !== 'techDebt')
            .filter((e) => !currentState.selectedProjectIds?.includes(e.id))
            .reduce((acc, cur) => {
                if (acc[cur.type]) {
                    return acc;
                }

                acc[cur.type] = acc[cur.type] || [];
                acc[cur.type].push(cur);

                return acc;
            }, {} as any),
    ).flatMap((e: any) => e[0]);

    const techProjects = currentProjects
        .filter((i) => i.type === 'techDebt')
        .filter((e) => !currentState.selectedProjectIds?.includes(e.id))
        .slice(0, 2);

    const [selectedProjects, setSelectedProjects] = useState<ProjectDto[]>([]);
    const [isTechMode, setIsTechMode] = useState<boolean>(false);

    const projectsToRender: ProjectDto[] = isTechMode ? techProjects : mainProjects;

    const handleSelectProject = (project: ProjectDto) => {
        if (!project) return;

        const hasId = selectedProjects.some((el) => el.id === project.id);

        if (hasId) {
            setSelectedProjects(selectedProjects.filter((el) => el.id !== project.id));
            return;
        }

        let newSelectedProjects = [...selectedProjects];

        if (project.type === 'techDebt') {
            newSelectedProjects = selectedProjects.filter((el) => el.type !== 'techDebt');
        }

        newSelectedProjects = [...newSelectedProjects, project];

        setSelectedProjects(
            newSelectedProjects.length > 2 ? newSelectedProjects.slice(1) : newSelectedProjects,
        );
    };

    const handleConfirmSelectedProjects = async () => {
        if (!selectedProjects.length) return;
        try {
            setIsPending(true);

            await gameSelect({
                projectIds: selectedProjects.map((el) => el.id),
            });
        } finally {
            setIsPending(false);
        }
    };

    const handleTechModeButtonClick = () => {
        setIsTechMode(false);
    };

    const isTechDebtSelected = selectedProjects.find((el) => el.type === 'techDebt');

    const ref1 = useRef<HTMLDivElement | null>(null);
    const ref2 = useRef<HTMLDivElement | null>(null);
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        if (!currentState.selectedProjectIds?.length && currentRoundIndex === 0) {
            setShowTour(true);
        }
    }, [currentRoundIndex, currentState.selectedProjectIds?.length]);

    const needToSelectDebtProject = useMemo(() => {
        if (selectedProjects.length < 2) return false;

        if (currentState.currentBalance.techDebt < 75) {
            return false;
        }

        return !selectedProjects.some((el) => el.type === 'techDebt');
    }, [currentState.currentBalance.techDebt, selectedProjects]);

    return (
        <GameLayout.Panel variant={'gradient'}>
            <div className={'space-y-14 mx-0 sm:mx-6'}>
                <div className={'text-center space-y-2'}>
                    <StepIndicator
                        innerRef={ref1}
                        current={Math.round((currentState.selectedProjectIds?.length ?? 0) / 2) + 1}
                        stepFormat={(step) => {
                            if (step === 1) return 'MVP';
                            return `Q${step - 1}`;
                        }}
                        total={5}
                    />
                    <Typography variant={'title'}>
                        {isTechMode
                            ? 'КАКОЙ ТЕХНИЧЕСКИЙ ПРОЕКТ БЕРЕМ?'
                            : `Разработка ${currentRound?.name}`}
                    </Typography>
                </div>

                <div className={'grid grid-cols-1 gap-6'} ref={ref2}>
                    {projectsToRender.map((item) => {
                        const isSelected = selectedProjects.some((el) => el.id === item.id);

                        return (
                            <ProjectCard
                                key={item.id}
                                project={item}
                                isSelected={isSelected}
                                onClick={() => handleSelectProject(item)}
                                className={'min-h-[14rem]'}
                            >
                                {Boolean(item.cost) && formatPrice(item.cost)}
                            </ProjectCard>
                        );
                    })}
                    {!isTechMode && (
                        <ProjectCard
                            project={
                                {
                                    name: 'Технические проекты',

                                    type: ProjectDtoTypeEnum.techDebt,
                                } as any
                            }
                            isSelected={Boolean(isTechDebtSelected)}
                            onClick={() => setIsTechMode(true)}
                            isExpanded
                            className={'min-h-[14rem]'}
                        >
                            <Typography className={'text-start text-2xl'}>
                                {isTechDebtSelected?.name || ''}
                            </Typography>
                        </ProjectCard>
                    )}
                </div>
            </div>
            <GameLayout.FloatingFooter>
                {!isTechMode && selectedProjects.length > 0 && (
                    <Button
                        className={'w-full'}
                        variant={selectedProjects.length === 2 ? 'primary' : 'accent'}
                        onClick={
                            !needToSelectDebtProject ? handleConfirmSelectedProjects : undefined
                        }
                        disabled={
                            selectedProjects.length !== 2 || isPending || needToSelectDebtProject
                        }
                    >
                        {needToSelectDebtProject
                            ? 'ВЫБЕРИ ТЕХНИЧЕСКИЙ ПРОЕКТ'
                            : selectedProjects.length === 2
                              ? 'ГОТОВ'
                              : 'ВЫБЕРИ ЕЩЁ ОДНУ'}
                    </Button>
                )}
                {isTechMode && (
                    <div className="mx-auto w-full pt-8 flex justify-between gap-10">
                        <Button
                            className={'flex-1'}
                            variant={'accent'}
                            onClick={handleTechModeButtonClick}
                        >
                            {selectedProjects.some((el) => el.type === 'techDebt')
                                ? 'выбрать'
                                : 'назад'}
                        </Button>
                    </div>
                )}
            </GameLayout.FloatingFooter>

            <GuidedTour
                isVisible={showTour}
                onClose={() => setShowTour(false)}
                steps={[
                    {
                        targetRef: ref1,
                        content: 'Первый проект MVP. Потом 4 квартала. Всего 5 раундов.',
                    },
                    {
                        targetRef: ref2,
                        content:
                            'Выберите 2 направления каждый раунд.\n\nОптимизируйте показатели и создай свою стратегию разработки!',
                    },
                ]}
            />
        </GameLayout.Panel>
    );
};

export default ProjectsPanel;
