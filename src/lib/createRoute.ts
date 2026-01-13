import React, { Suspense } from 'react';

import { generatePath } from 'react-router';

interface RouteConfig<PATH extends string> {
    label: string;
    path: PATH;
}

const RouteContext = React.createContext<RouteConfig<string>>(null!);

export function useRoute() {
    if (!RouteContext) {
        throw new Error('useRoute must be used within RouteContext');
    }
    return React.useContext(RouteContext);
}

type FunctionReturnType<T extends React.FC, PathRoute extends string> = T &
    RouteConfig<PathRoute> & {
        generatePath: (
            params?: { [key in PathRoute | (string & {})]?: string },
            addPath?: string,
        ) => string;
    };

export function createRoute<T extends React.FC, PathRoute extends string>(
    Component: any,
    config: RouteConfig<PathRoute>,
): FunctionReturnType<T, PathRoute> {
    const WrappedComponent: any = (props: React.ComponentProps<T>) => {
        return React.createElement(
            RouteContext.Provider,
            { value: config },
            React.createElement(Suspense, { fallback: '' }, React.createElement(Component, props)),
        );
    };

    WrappedComponent.label = config.label;
    WrappedComponent.path = config.path;
    WrappedComponent.generatePath = (params: any, addPath: any) =>
        generatePath(config.path + (addPath ?? ''), params) as any;

    return WrappedComponent as FunctionReturnType<T, PathRoute>;
}
