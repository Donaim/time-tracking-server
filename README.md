
# Time tracking server

This is a simple Nest.js server that provides time tracking for user defined tasks.

# Deployment

Easiest way to use the server is with docker.
Run `make docker-compose`, wait until you get Nest.js messages and 
then go to `localhost:3000/ping` where you should be met with `pong` message if everything goes well.

Another way is to install `postgres` locally and run `make postgres-run`
followed by `npm install && make dev` (in another terminal).

# Documentation

To generate documentation run `npm install && npm run docs` 
and then open `docs/index.html`.

Server API reference is available at `localhost:3000/api` when server is run.
It is generated with `Nest.js/swagger`, so it is human-readable.

# License

GPL-3.0 or later.



