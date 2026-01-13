export const delayTransition = (init: number, diff: number) => (count: number) =>
    init + diff * count;
