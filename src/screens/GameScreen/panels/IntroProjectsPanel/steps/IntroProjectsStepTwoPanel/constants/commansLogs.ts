import { CommandType } from '../types/CommandType.ts';

export const COMMANDS_LOG: { type: CommandType; text: string }[] = [
    { type: CommandType.Init, text: 'Покупка сервера...' },
    { type: CommandType.Info, text: 'Сервер успешно добавлен в корзину' },
    { type: CommandType.Info, text: 'Сервер оплачен' },
    { type: CommandType.Info, text: 'Сервер доставлен в дата-центр' },
    { type: CommandType.Success, text: 'Сервер готов к работе' },

    { type: CommandType.Init, text: 'Инициализация проекта...' },
    { type: CommandType.Info, text: 'Выбран стек: Пользовательская сборка' },
    { type: CommandType.Info, text: 'Поиск разработчиков...' },

    { type: CommandType.Install, text: 'Установка зависимостей...' },
    { type: CommandType.Info, text: 'Поиск нужных пакетов...' },
    { type: CommandType.Info, text: 'Загрузка архивов...' },
    { type: CommandType.Info, text: 'Распаковка и установка...' },
    { type: CommandType.Success, text: 'Основные зависимости установлены' },

    { type: CommandType.Install, text: 'Установка инструментов разработчика...' },
    { type: CommandType.Info, text: 'Добавление сборщиков и компиляторов...' },
    { type: CommandType.Info, text: 'Подготовка окружения для разработки...' },
    { type: CommandType.Success, text: 'Среда разработки готова' },

    { type: CommandType.Build, text: 'Сборка приложения...' },
    { type: CommandType.Info, text: 'Запуск процесса сборки...' },
    { type: CommandType.Info, text: 'Компиляция исходного кода...' },
    { type: CommandType.Info, text: 'Оптимизация ресурсов...' },
    { type: CommandType.Success, text: 'Сборка завершена успешно' },

    { type: CommandType.Setup, text: 'Подготовка среды выполнения...' },
    { type: CommandType.Info, text: 'Загрузка конфигураций...' },
    { type: CommandType.Info, text: 'Установка переменных окружения...' },
    { type: CommandType.Info, text: 'Проверка системных зависимостей...' },
    { type: CommandType.Success, text: 'Среда выполнения настроена' },

    { type: CommandType.Run, text: 'Запуск сервисов...' },
    { type: CommandType.Info, text: 'Поднятие серверной части...' },
    { type: CommandType.Info, text: 'Активация пользовательского интерфейса...' },
    { type: CommandType.Info, text: 'Установка соединения с базой данных...' },
    { type: CommandType.Success, text: 'Все сервисы успешно запущены' },

    { type: CommandType.Complete, text: 'Проект готов к использованию' },
];
