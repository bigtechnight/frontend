FROM node:20-bullseye-slim as base

ENV NODE_ENV production
RUN npm install -g pnpm@latest-10

FROM base as deps

WORKDIR /frontend

ADD package.json pnpm-lock.yaml ./
RUN npm run dependency:install


FROM base as production-deps

WORKDIR /frontend

COPY --from=deps /frontend/node_modules /frontend/node_modules
ADD package.json pnpm-lock.yaml ./

FROM base as build

WORKDIR /frontend

COPY --from=deps /frontend/node_modules /frontend/node_modules
ADD .env .env
ADD package.json pnpm-lock.yaml tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
ADD src/ src/
ADD public/ public/

RUN npm run build

FROM base

WORKDIR /frontend

COPY --from=production-deps /frontend/node_modules /frontend/node_modules
COPY --from=build /frontend/dist /frontend/dist
COPY --from=build /frontend/package.json /frontend/package.json
COPY --from=build /frontend/src /frontend/src
ADD tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts ./

CMD ["npm", "run", "start:prod"]
