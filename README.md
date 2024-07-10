# Simple REST API to control a person's diet

- It has a integrated Knex Database so it can be run locally anytime.

# How to run
* npm i
* npm run dev
* enjoy :)

# Endpoints Documentation:

## Users Controller:
  #### Create User
  * Context: Register a user in the database
  * Method: POST
  * URL: /
  * JSON Payload: `{
    "name": "string"
  }`

## Meals Controller:
  #### Create Meal
  * Context: Register a meal in the database
  * Method: POST
  * URL: /
  * JSON Payload: `{
    "name": "string",
    "description": "string",
    "isDiet": bool 0 | 1,
  }`

  #### Edit Meal
  * Context: Edit a meal in the database
  * Method: PUT
  * URL: /:id
  * JSON Payload: `{
    "name": "string",
    "description": "string",
    "isDiet": bool 0 | 1,
  }`

  #### Delete Meal
  * Context: Delete a meal in the database
  * Method: DELETE
  * URL: /:id
  * JSON Payload: `{
    "id": number
  }`

  #### Get Meals
  * Context: Get all meals
  * Method: GET
  * URL: /
  * JSON Payload: None

  #### Get Meal
  * Context: Get all meals
  * Method: GET
  * URL: /:id
  * JSON Payload: None

  #### Get Metrics
  * Context: Get metrics by user
  * Method: GET
  * URL: /metrics
  * JSON Payload: None
