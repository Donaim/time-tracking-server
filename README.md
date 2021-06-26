
# Time tracking server

This is a simple `Nest.js` server that provides time tracking for user defined tasks.

# Deployment

Easiest way to use the server is with docker.
Run `make docker-compose`, wait until `Nest.js` messages come up and
then go to [localhost:3000/ping](http://localhost:3000/ping) where you should be met with `pong` message if everything goes well.

Another way is to install `postgres` locally and run `make postgres-run`
followed by `npm install && make dev` (in another terminal).

# Documentation

Code documentation is available online on [github](https://donaim.github.io/time-tracking-server/).
To get it locally, run `npm install && npm run docs` and open `docs/index.html`.

Server API documentation is available at [localhost:3000/api](http://localhost:3000/api) when the server is run,
or over at server's [heroku instance](https://mysterious-plains-34555.herokuapp.com/api/) while it is online.
The API docs are generated with `Nest.js/swagger`, they are human-readable.

# Tech stack

- Server is built on `Nest.js` which also means `Typescript`.
- The database is `PostgreSQL` wrapped with `Sequelize`.
- Docs are generated with `JSDoc`/`better-docs`/`nestjs/swagger`/`swagger-ui-express` stack.
- Testing is done using `jest`/`supertest`(`Chai` plugin), which are defaults for `Nest.js`.
- For Continuous Integration, github actions are used.
- CI makes use of [server's docker image](Dockerfile).
- Server is deployed on [heroku](https://mysterious-plains-34555.herokuapp.com/ping).
- Docs are deployed on [github-pages](https://donaim.github.io/time-tracking-server/).

# Possible improvements

- Task creation is coupled with starting the task. We may want to support a separate call for creation because current API does not allow user to "plan ahead".
- Would be nice to be able to fetch not just the current task, but all the tasks.
- Support for multiple users is also desired.
- Many tasks have deadlines, so it would be nice to support them as well.

# Uncertanties/Questions

- Task shape is not specified. It is assumed to be a tuple of name, description, start time and end time.
- Date format is not specified. It is assumed to be unix timestamp UTC.

# License

GPL-3.0 or later.



