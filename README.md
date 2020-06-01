# REST API KNEX OBJECTION.JS

## Setup

```sh
npm install
```

## Run

```sh
npm run dev
```

# REST API

The REST API to the example app is described below.

## Get list of Things

### Request
 * Register user
`GET /users/`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users

## Deploy to Heroku
* Heroku app
  * sudo snap install heroku --classic [ubuntu] / install heroku cli
  * login/signup to heroku website 
  * heroku create [name of app]
  * heroku open <--- visit the app
  * heroku logs (view logs )
  * line 88 [test/app-test.js] delete test record

## Next
* [ ] Add postgres DB to Heroku