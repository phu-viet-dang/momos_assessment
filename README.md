# Media Scraper

Foobar is a Python library for dealing with word pluralization.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Run application by Docker Compose

In the root of repository

```bash
docker compose up --build
```

## Run application by Docker Compose

Prepare a postgres DB locally or external DB, update .env file in server folder

```bash
DB_HOST=localhost #or external DB uri
...
```

Then run migration by sequelize-cli

```bash
npx sequelize-cli db:migrate
```

Run FE locally

```bash
yarn start
```

Run BE locally

```bash
yarn start:dev
```
