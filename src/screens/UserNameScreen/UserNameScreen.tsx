import { useCallback } from 'react';

import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';

import { setUserNameLocalStorage, userNameAtom } from '@/atoms/userAtom.ts';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { useNameValidation } from '@/hooks/useNameValidation';
import i18n from '@/i18n';
import { OnboardingScreenRoute } from '@/screens';

const UserNameScreen = () => {
    const [name, setName] = useAtom(userNameAtom);
    const { validationState: nameValidation, debouncedName } = useNameValidation(name, 300);

    const navigate = useNavigate();

    const goOnboardingScreen = useCallback(() => {
        if (nameValidation.isAvailable) {
            setUserNameLocalStorage(name);
            navigate(OnboardingScreenRoute.path);
        }
    }, [name, nameValidation.isAvailable, navigate]);

    const nameChanged = debouncedName !== name;

    // Кнопка активна только если имя проверено и доступно
    // Не блокируем кнопку во время ввода, только если проверка показала что имя занято
    const isButtonDisabled =
        !name || !nameValidation.isAvailable || nameChanged || nameValidation.isLoading;

    return (
        <GameLayout.Screen>
            <GameLayout.Header isBack backUrl={'/'} />
            <GameLayout.Panel variant={'gradient'}>
                <div className={'text-center space-y-2'}>
                    <Typography variant={'title'} animated>
                        Как вас зовут?
                    </Typography>
                    <Typography variant={'subtitle'} animated delay={0.5}>
                        покажем имя на доске почёта, конечно!
                    </Typography>
                </div>
                <div className={'mt-[30vh] w-full space-y-4'}>
                    <div className={'flex items-center'}>
                        <input
                            className={
                                'text-center text-6xl w-full outline-none placeholder:text-primary/20'
                            }
                            autoFocus
                            placeholder={'ИМЯ'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {name && (
                        <div className={'text-center'}>
                            {!nameValidation.isLoading && nameValidation.isAvailable === true && (
                                <Typography variant={'text'} className={'text-green-400'}>
                                    {`✓ ${nameValidation.message || ''}`}
                                </Typography>
                            )}
                            {!nameValidation.isLoading && nameValidation.isAvailable === false && (
                                <Typography variant={'text'} className={'text-red-400'}>
                                    {`✗ ${nameValidation.message || nameValidation.error || ''}`}
                                </Typography>
                            )}
                        </div>
                    )}
                </div>
                <GameLayout.FloatingFooter>
                    <Button
                        variant={'primary'}
                        className={'w-full'}
                        disabled={isButtonDisabled}
                        onClick={goOnboardingScreen}
                    >
                        {i18n.t('letsGo')}
                    </Button>
                </GameLayout.FloatingFooter>
            </GameLayout.Panel>
        </GameLayout.Screen>
    );
};

export default UserNameScreen;
