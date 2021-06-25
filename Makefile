
docker:
	sudo docker build -t time-tracking-server .

docker-run:
	sudo docker run -it -p 3000:3000 time-tracking-server
