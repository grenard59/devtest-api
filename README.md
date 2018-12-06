# Pingflow Api server

### Prerequisite

* MongoDB 3.6.x installed and running (sorry ;)) 
* NodeJS 8.9.x

Lastest version of `yarn` :

- ```npm install -g yarn```

## Getting started

### Install packages
Run the following command
* `yarn install`

### Create secret token
- Create an `.env` file at the root of the folder.
- Add to the file (use `.env.example` as example)
  ```
  MASTER_KEY=NO_VERY_SECRET  
  JWT_SECRET=NO_VERY_SECRET
  ```
  
  `JWT_SECRET` is not used ATM
  
## Fire it up
Start the server by running `yarn start`
