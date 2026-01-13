import type { SelectDto, SelectResultDto } from '@/api';

export interface GamePanelComponentProps {
    selectResult: SelectResultDto;
    gameSelect: (data: SelectDto, pass?: boolean) => Promise<void>;
}
