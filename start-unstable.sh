(docker network ls|grep bigtechnight-unstable > /dev/null || docker network create -d bridge bigtechnight-unstable) && \
docker compose -f docker-compose-unstable.yml up -d --build --force-recreate
