import { CommandType } from '../types/CommandType.ts';

import { CHAR_ASTERISK, CHAR_GREATER, CHAR_PLUS, CHAR_TILDA } from '@/constants/charCodes.ts';

export function getSymbolAndColor(type: CommandType): { symbol: string; className?: string } {
    switch (type) {
        case CommandType.Info:
            return { symbol: CHAR_GREATER, className: 'text-muted-foreground' };
        case CommandType.Install:
            return { symbol: CHAR_PLUS, className: 'text-blue-500' };
        case CommandType.Build:
            return { symbol: CHAR_TILDA };
        case CommandType.Setup:
            return { symbol: CHAR_TILDA };
        case CommandType.Run:
            return { symbol: CHAR_TILDA };
        case CommandType.Init:
            return { symbol: CHAR_TILDA };
        case CommandType.Success:
            return { symbol: CHAR_ASTERISK, className: 'text-green-500' };
        case CommandType.Complete:
            return { symbol: '!!!', className: 'text-green-200 text-lg pt-4' };
        default:
            return { symbol: CHAR_GREATER };
    }
}
