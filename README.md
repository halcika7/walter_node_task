# Walter Code Node_Mongo task
##### User can register and login with email and password. 
##### User can add, update, and delete shopping lists
##### User can update password
##### User can get report for selected time interval
___

## Tech used

##### Backend
* Node.js
* Express
* TypeScript
* JWT
* MongoDB with mongoose

##### Frontend
* React.js
* TypeScript
* React Router
* Redux
* Redux Thunk - for async actions
* Reselect
* Formik
* Yup
* Styled Components

---

## Installation

```
git clone git@github.com:halcika7/softhouse-app.git folder-name
cd path/to/folder
<!-- The bash script will work for Linux and Mac users -->
<!-- For Windows, go and rename all .env.example files to .env -->
bash script.sh
```

**Root .env file**

* Change MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD to the values you want to use

**Backend .env file**
* Change {{ MONGO_INITDB_ROOT_USERNAME }} with the value  of MONGO_INITDB_ROOT_USERNAME from the root .env
* Change {{ MONGO_INITDB_ROOT_PASSWORD }} with the value of MONGO_INITDB_ROOT_PASSWORD from the root .env


## Start project

```
cd path/to/project
docker-compose up
```
