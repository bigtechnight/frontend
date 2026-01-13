import { CHAR_NARROW_SPACE, CHAR_RUBLE } from '@/constants/charCodes.ts';

export interface FormatPriceOptions {
    useGrouping?: boolean; // Нужно ли разделять тысячи пробелами
}

export function formatPrice(price: number, options: FormatPriceOptions = {}) {
    const { useGrouping = true } = options;

    const formattedNumber = price.toLocaleString('ru-RU', {
        useGrouping,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return `${formattedNumber}${CHAR_NARROW_SPACE}${CHAR_RUBLE}`;
}
