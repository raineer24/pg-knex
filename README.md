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

## Get Current User's Profile

### Request

* Private - use jwt strategy to authenticate

`GET /api/v2/users/profile/current `

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile/current

## Create or Edit user profile

### Request

* Private - use jwt strategy to authenticate

`POST /api/v2/users/profile `

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile               

## Add experience to profile

### Request

* Private - use jwt strategy to authenticate

`POST /api/v2/users/profile/experience`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile/experience

## Delete experience from profile

### Request

* Private - use jwt strategy to authenticate

`DELETE /api/v2/users/profile/experience/:exp_id`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile/experience/:exp_id


## Delete profile, user 

### Request

* Private - use jwt strategy to authenticate

`DELETE /api/v2/users/profile`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile

## Add profile education

### Request

* Private - use jwt strategy to authenticate

`POST /api/v2/users/profile/education`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile/education


## Add Post

### Request

* Private - use jwt strategy to authenticate

`POST /api/v2/posts`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/posts

 ## Get All Posts

### Request

* Private - use jwt strategy to authenticate

`POST /api/v2/posts`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/posts 


 ## Get Github Repository by username

### Request

* Public - Get Github Repository by username

`POST /api/v2/users/profile/github/:username`

    curl -i -H 'Accept: application/json' localhost:3000/api/v2/users/profile/github/:username


    
