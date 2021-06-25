
dev:
	rm -rf dist
	DB_SCHEMA=task_db \
	DB_USER=task_user \
	DB_HOST=localhost \
	DB_PORT=5432 \
	npm run start:dev

docker-build:
	sudo docker build -t time-tracking-server .

docker-run: docker-build
	sudo docker run -it -p 3000:3000 time-tracking-server

docker-compose: docker-build
	sudo docker-compose up

postgres-run:
	pg_ctl -l /tmp/postgres-log -o "-k /tmp" start & disown
	sleep 5
	psql --dbname=task_db --username=task_user || true
	pg_ctl stop
