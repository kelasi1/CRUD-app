

## Instalation

- You need to download Node.jds ( NodeJS.org ) and Docker (https://www.docker.com/products/docker-desktop/).
- To install required libraries go to project folder in PowerShell and run command "npm i".
- We need to install mysql2 by command in PowerShell "npm i mysql2" and next "npm i sequelize".
- In PowerShell run command "docker run --name=mysql-tin --env="MYSQL_ROOT_PASSWORD=toor" --publish 3306:3306 mysql:latest".
- In PowerShell go to folder "docker" and run command "docker-compose up".
- In new PowerShell window go to folde with project and run command "npm start" to run web server with deafult port 3000.
- Now with URL "localhost:3000" in browser we can see the site.

# Description
- Project use node.js libraries as ORM Sequelize to connect with database. Docker is used to visualisate a mysql database.
- Database is created based on a small diagram showed below.

![image](https://user-images.githubusercontent.com/103190671/165916762-2ad433b2-9381-4315-8459-027fa9c7e4ab.png)

- To use the app firstly we need to log in. For example with email "jan.kowalski@gmail.com" and pass "12345". 
- We can also switch to ENG version of the app.
- Start view:

![image](https://user-images.githubusercontent.com/103190671/165918050-d854aaad-bc54-4795-9a40-d1ef725c810f.png)

- Main Page view
- 
![image](https://user-images.githubusercontent.com/103190671/165918105-23496f34-e8e7-4e66-b63e-4d36b6b6d5e9.png)

- We can add a new fighter, edit a fighter, see a details of the fighter and delete a fighter. The same thing we can do with 'Arts of fight' and 'Training'.
- List of the fighters view: 
- 
- ![image](https://user-images.githubusercontent.com/103190671/165918562-0bce23ad-36b3-4cc7-b1ff-5392ca422380.png)



![image](https://user-images.githubusercontent.com/103190671/165918605-a8f9aff7-ba63-49fa-853d-6b1dde5c64f5.png)


- There is a server side validation using joi library and client side validation using JS.


![image](https://user-images.githubusercontent.com/103190671/165918649-e3435dfd-8754-4d4e-814f-25580a483ed4.png)


![image](https://user-images.githubusercontent.com/103190671/165918729-3cc03e32-7746-481c-b217-9e04ca0e006e.png)


![image](https://user-images.githubusercontent.com/103190671/165918778-489f58b7-fcc7-477e-8cc7-e5c45b13d1d8.png)


![image](https://user-images.githubusercontent.com/103190671/165918890-a18abf16-2059-4d66-850f-d588e5cd13be.png)


![image](https://user-images.githubusercontent.com/103190671/165918908-445813e9-78d5-4fad-92da-ad224b810972.png)


