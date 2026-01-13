import type { GameDto, UnitDto } from '@/api';

/**
 * Получает названия всех unit'ов по их id из всех раундов
 * @param gameData - данные игры
 * @param unitIds - массив id unit'ов
 * @returns массив названий unit'ов
 */
export const getUnitNamesByIds = (
    gameData: GameDto,
    unitIds: string[],
): { id: string; name: string; quizName: string }[] => {
    const unitMap = new Map<string, { id: string; name: string; quizName: string }>();

    gameData.rounds.forEach((round) => {
        round.quiz.forEach((quiz) => {
            quiz.units.forEach((unit) => {
                if (unitIds.includes(unit.id) && !unitMap.has(unit.id)) {
                    unitMap.set(unit.id, {
                        id: unit.id,
                        name: unit.name,
                        quizName: quiz.name,
                    });
                }
            });
        });
    });

    return Array.from(unitMap.values());
};

/**
 * Получает все unit'ы из всех раундов
 * @param gameData - данные игры
 * @returns массив всех unit'ов
 */
export const getAllUnits = (gameData: GameDto): UnitDto[] => {
    const allUnits: UnitDto[] = [];

    gameData.rounds.forEach((round) => {
        round.quiz.forEach((quiz) => {
            allUnits.push(...quiz.units);
        });
    });

    return allUnits;
};

/**
 * Получает unit по его id из всех раундов
 * @param gameData - данные игры
 * @param unitId - id unit'а
 * @returns найденный unit или undefined
 */
export const getUnitById = (gameData: GameDto, unitId: string): UnitDto | undefined => {
    for (const round of gameData.rounds) {
        for (const quiz of round.quiz) {
            const unit = quiz.units.find((u) => u.id === unitId);
            if (unit) {
                return unit;
            }
        }
    }
    return undefined;
};

/**
 * Создает карту id -> название для всех unit'ов
 * @param gameData - данные игры
 * @returns Map с id unit'а в качестве ключа и названием в качестве значения
 */
export const createUnitsIdToNameMap = (gameData: GameDto): Map<string, string> => {
    const unitsMap = new Map<string, string>();

    gameData.rounds.forEach((round) => {
        round.quiz.forEach((quiz) => {
            quiz.units.forEach((unit) => {
                unitsMap.set(unit.id, unit.name);
            });
        });
    });

    return unitsMap;
};

/**
 * Получает информацию о всех раундах с их unit'ами
 * @param gameData - данные игры
 * @returns массив объектов с информацией о раундах
 */
export const getRoundsWithUnits = (gameData: GameDto) => {
    return gameData.rounds.map((round) => ({
        roundId: round.id,
        roundName: round.name,
        quizzes: round.quiz.map((quiz) => ({
            quizId: quiz.id,
            quizName: quiz.name,
            units: quiz.units.map((unit) => ({
                id: unit.id,
                name: unit.name,
                cost: unit.cost,
                description: unit.description,
                profits: unit.profits,
            })),
        })),
    }));
};
