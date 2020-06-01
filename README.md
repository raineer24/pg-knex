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

## Get All Users

### Request

* public

`GET /users/`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users

## Get All User Profiles

### Request

* public

`GET /api/v2/users/profile/getProfiles`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile/getProfiles

 ## Register a User

### Request

* public

`POST /api/v2/users/register  `

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/register 

## Login a User

### Request

* public / Return JWT

`POST /api/v2/users/login  `

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/login

## Get current user's profile

### Request

* Private - use jwt strategy to authenticate

`GET /api/v2/users/profile/current `

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile/current        


