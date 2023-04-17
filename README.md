# Tasks Management Backend

Backend APIS that allows users to manage thier tasks.

## Technology and Tools

-   Express (Nodejs Framework)
-   Typescript
-   Mysql
-   express-validator
-   sequelize

## Requirements

-   Linux/Windows/macOS
-   Node and NPM
-   Yarn
-   Git
-   Mysql

To update and access the code for the system, please follow these steps:

-   git clone (...url).
-   Run `yarn install`.
-   Add `.env` file in the root folder with this fields in the file.
  
    ```
        PORT=3000

        //(Secret key to generate secured tokens)
        SECRETKEY="" 
        
        //(Database Host)
        DB_HOST="" 
        //(Database Port)
        DB_PORT=""
        //(DataBase UserName)
        DB_USER=""
        //(Database Password)
        DB_PASSWORD="" 
        //(Database Name)
        DB_NAME=""
    ```

-   To run in development, Run `yarn dev:ts`.

## Code Explanation

The Backend of ```Tasks Management``` system would be implemented using the typical framework of express which includes:

-   Models
-   Services
-   Controllers
-   Routers

## Auther

-   @Mohamed Helmi (Senior Software Engineer)

## Summary

The above provides a quick overview on how the code has been setup, would be developed and built.

## CRUDS

You will now be able to access CRUD (create, read) endpoints

### Auth

  - `[POST] http://localhost:3000/login` Login endpoint
  
    ```
        {
            "email": "",
            "password": "
        }
    ```

  - `[POST] http://localhost:3000/signup` Sigup endpoint
  
    ```
        {
            "name": "",   
            "email": "",
            "password": ""
        }
    ```

  - `[POST] http://localhost:3000/forget-password` ForgetPassword endpoint
  
    ```
        {  
            "email": "",
        }
    ```

### Tasks

  - `[GET] http://localhost:3000/tasks` Get Tasks endpoint
  
  - `[POST] http://localhost:3000/tasks` Create New Task
  
    ```
        {
            "title": "",
            "projectId": "",  optional
            "status": "",  optional
        }
    ```

### Projects

  - `[GET] http://localhost:3000/projects` Get Projects endpoint
  - `[POST] http://localhost:3000/projects` Create New Project
  
    ```
        {
            "name": ""
        }
    ```



## Database Digram

!["DB Schema"](https://github.com/mohamedhelmi70/tasks-management/blob/master/assets/DB_Schema.png?raw=true "DB Schema")

## LICENSE
Copyright (c) 2023
