# HACKATON_IIM_OCT_2020

## 0 - Prerequisite :
Check that the following elements are installed on your computer :
* Nodejs + NPM (https://nodejs.org/en/download/)
* Vue/CLI (https://cli.vuejs.org/guide/installation.html)
* Quasar/CLI (https://quasar.dev/quasar-cli/installation)

## 1 - Install server 

### Execute following commands : (from repository root)
* cd server
* npm install

Create a MYSQL Database on your computer, & then go to the .ENV file located at the root of the SERVER folder. Edit the MYSQL Connexion settings according to the database you just created.

### Run this command to start the server
* npm run serve 

## 2 - Install backend app :

### Execute the following commands : (from repository root)
* cd backend_app
* npm install

## 3 - Start applications :

### A. Server app :
* cd server
* node server.js

### B. Backend client :
* cd backend_client
* npm run serve

#### Now you're live ! go to http://localhost:8080 to log-in.
##### Credentials :
* email : admin@email.com
* password : password
