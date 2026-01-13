(docker network ls|grep bigtechnight-production > /dev/null || docker network create -d bridge bigtechnight-production) && \
docker compose up -d --build --force-recreate
