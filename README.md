# dataPeace-Assignment

Backend Assignment
Question :> Create REST APIs using NodeJS (ExpressJS or any other web framework of your choice) or Python (Flask or any other web framework of your choice) for managing the user’s data. You can use database(i.e SQL, NOSQL) of your choice to store the data. Take sample data from here.

User should have following attributes:-
ID
First Name
Last Name
Company Name
Age
City
State
Zip
Email
Web

An Application should have following endpoints:-

1. /api/users - GET - To list the users 
Also, supports some query parameters:-
*page - a number for pagination
*limit - no. of items to be return, default limit is 5
*name - search user by name as substring in First Name or Last Name (Note, use substring matching algorithm/pattern to match the name)
*Sort - name of attribute, the items to be sort. By default it returns items in ascending order if  this parameter exist, and if value of parameter is prefix with ‘-’ character, then it should return item in descending order
Sample query endpoint:- /api/users?page=1&limit=10&name=James&sort=-age
This endpoint should return list of 10 users whose first name or last name contains substring given name and sort the users by age in descending order of page 1.

2. /api/users - POST - To create a new user
Request Payload should be like in json format :-
This endpoint will create a new user inside the database

3. /api/users/{id} - GET - To get the details of a user
Here {id} will be the id of the user in path parameter 

4. /api/users/{id} - PUT - To update the details of a user
Here {id} will be the id of the user in path parameter 

5. /api/users/{id} - DELETE - To delete the user
Here {id} will be the id of the user in path parameter 



To start the server :
1.Clone the repo
2.Run `npm start`

