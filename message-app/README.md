# Message App
> A simple app that allows you to get the sha256 digest of a text and retrieve original message based on digest

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- [![Packagist](https://img.shields.io/packagist/v/symfony/symfony.svg)]() -->

## Pre-requisities:
> Some key things to set up / understand to use this app:

- **[NodeJS v9](https://nodejs.org/en/)**
- **[npm](https://www.npmjs.com/)**

## Heroku URL
> https://enigmatic-ocean-93990.herokuapp.com/messages

## Downloading
1. Download the misc repository on my github
```bash
$ git clone https://github.com/mayankamencherla/misc.git
```
2. Head to the message-app directory from the root
```bash
$ cd message-app
```

## Setup Locally
> After setting up the app, details on each API and how to use it can be found below in the **[Docs](https://github.com/mayankamencherla/misc/message-app#Docs)** section.
> If any of the commands below are denied due to a permission error, please prepend a sudo to the command.

1. Navigate to the app's root directory

2. Run the following command to install all the dependencies:
```bash
$ npm install
```

3. Set up the environment variables in the .env file

4. Set up mysql on your machine from **[here](https://dev.mysql.com/doc/mysql-getting-started/en/)**

5. Log in to your mysql instance locally, and run the following commands:
```sql
mysql> DROP DATABASE IF EXISTS message_app;
mysql> CREATE DATABASE message_app;
```

6. To get your local mysql to bind to the app, you must first copy over the sample knexfile. The app has `root@password` as the default configuration, which must be changed in development to suit the credentials on your local MySQL instance. You can change this in the **[knex-sample.js](http://knexjs.org/#knexfile)** file before executing the command below:
```bash
$ cp knex-sample.js knexfile.js && cd ..
```

7. The final step in setting up the DB is to run migrations. Please use the following commands from the app's root directory:
```bash
$ npm i knex -g
$ knex migrate:latest
```
- If the command above doesn't work, please try running the command below:
```bash
$ npm run migrate
```

8. Run the app on localhost by typing the following command:
```bash
$ npm start
```

## Docs
- POST / message
1. Request format:
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"message": "foo"}' https://enigmatic-ocean-93990.herokuapp.com/messages
```
2. Response format:
```json
{
    "success": "<if the digest was computed and returned>",
    "reusable": "<If the digest can be used to retrieve original message>",
    "digest": "53c6187f30a50e54f205bf250a6652394d5b8f92d03c39a27208703ab9e21079"
}
```

- GET / message/{digest}
1. Request format:
```bash
$ curl -X GET -H "Content-Type: application/json"' https://enigmatic-ocean-93990.herokuapp.com/messages/{digest}
```
2. Response format:
```json
{
    "success": "<if the digest was used to get the original message>",
    "message": "<Original message or failure reason>"
}
```