
dev:
	DB_SCHEMA=task_db \
	DB_USER=task_user \
	DB_HOST=localhost \
	DB_PORT=5432 \
	npm run start:dev

docker:
	sudo docker build -t time-tracking-server .

docker-run:
	sudo docker run -it -p 3000:3000 time-tracking-server

docker-compose:
	sudo docker-compose up
