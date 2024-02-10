

## Download This Repo,
## clone this app: npm clone (https://github.com/Sagar31658/EasyDrive.git)

## run: node server.js

##Note: while using postman for API Testing, make sure you first Login and then copy "Token", {Each Time you login, copy the "Token" because it will be changed everytime you login}
##Now,

##the API which has (isAuth) will need that "Token", After getting the Token, While sending request on postman.. Go To "Auth" ----> Select "Bearer Token" and insert that "Token" in the field.
##Only After that send the request. Because I have applied both Authentication and Authorization.

- (isAuth)    add Car: http://localhost:3000/api/add-car/
- show Cars: http://localhost:3000/api/show-all-cars/
- (isAuth)    show individual Cars: http://localhost:3000/api/show-car/{carId} (copy carId from database and paste it here at the end)
- (isAuth)    edit Car: http://localhost:3000/api/edit-car/{carId} (copy carId from database and paste it here at the end)
- (isAuth)    delete Car: http://localhost:3000/api/delete-car/{carId} (copy carId from database and paste it here at the end)
- (isAuth)    addToCart: http://localhost:3000/api/add-to-cart/{carId} (copy carId from database and paste it here at the end)
- (isAuth)    deleteFromCart: http://localhost:3000/api/remove-from-cart/{carId} (copy carId from database and paste it here at the end)

- SignUp: http://localhost:3000/user/signup
- Login: http://localhost:3000/user/login
- (isAuth)    logout: http://localhost:3000/user/logout


