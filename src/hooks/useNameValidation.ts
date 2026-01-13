import { useEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

import { GameApiRequest } from '@/api/request';

export interface NameValidationState {
    isLoading: boolean;
    isAvailable: boolean | null;
    message: string | null;
    error: string | null;
}

export interface UseNameValidation {
    validationState: NameValidationState;
    debouncedName: string;
}

export function useNameValidation(name: string, delay: number = 100): UseNameValidation {
    const [validationState, setValidationState] = useState<NameValidationState>({
        isLoading: false,
        isAvailable: null,
        message: null,
        error: null,
    });

    const debouncedName = useDebounce(name || '', delay);

    useEffect(() => {
        setValidationState({
            isAvailable: null,
            message: null,
            isLoading: true,
            error: null,
        });
    }, [name]);

    useEffect(() => {
        if (
            !debouncedName ||
            (typeof debouncedName === 'string' && debouncedName?.trim().length === 0)
        ) {
            setValidationState({
                isLoading: false,
                isAvailable: null,
                message: null,
                error: null,
            });
            return;
        }

        const abortController = new AbortController();

        GameApiRequest.checkName(
            { checkNameDto: { name: debouncedName } },
            {
                signal: abortController.signal,
            },
        )
            .then(({ data }) => {
                if (!abortController.signal.aborted) {
                    setValidationState({
                        isLoading: false,
                        isAvailable: data.isAvailable,
                        message: data.isAvailable ? 'Имя доступно' : 'Имя занято',
                        error: null,
                    });
                }
            })
            .catch((error) => {
                if (!abortController.signal.aborted) {
                    console.error('Name validation error:', error);
                    setValidationState({
                        isLoading: false,
                        isAvailable: null,
                        message: null,
                        error: null,
                    });
                }
            });

        return () => {
            abortController.abort();
        };
    }, [debouncedName]);

    return { validationState, debouncedName };
}
