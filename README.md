# Deploy de la API con Vercel
Link publico de la API a la que se le pueden hacer consultas: https://backend-mystore-mysql.vercel.app/
Link del proyecto: https://vercel.com/victor-guzmans-projects/backend-mystore-mysql
# Endpoints:

## Products

- **Get Products:** /api/v1/products
	- Query params: 
		- limit
		- offset
		- price
		- price_min
		- price_max
- **Get Product by ID:** /api/v1/products/${productID}
- **POST Products:** /api/v1/products
{
"name":  "Camisa 7",
"price":  80,
"description":  "camisa",
"image":  "https://www.camisas.com",
"categoryId":  "4yM2"
}
- **PATCH Products:** /api/v1/products/${productID}
{
// "name": "random product 2",
// "price": 0,
"image":  "https://media.istockphoto.com/id/1136522918/es/foto/guantes-de-boxeo-colgando.jpg?s=612x612&w=0&k=20&c=35gIJ7yPJo-EiJRTwk5JnZsgk9Yp5EGtyfJ9F_cT2Uk="
}

- **DELETE Product:** /api/v1/products/${productID}

## Categories
- **Get Categories:** /api/v1/categories
- **Get Category by ID:** /api/v1/categories/${categoryID}
- **POST Category:** /api/v1/categories
{
"name":  "Ropa"
}
- **PATCH Category:** /api/v1/categories/${categoryID}
{
"name":  "New Plasticos"
}

- **DELETE Category:** /api/v1/categories/${categoryID}
 

## Users

- **Get Users:** /api/v1/users
- **Get User by ID:** /api/v1/users/${userID}
- **POST User:** /api/v1/users
    {
    "name":  "Vic",
    "email":  "vic@hotmail.com",
    "password":  "123",
    "role":  "FullStack Web Developer"
    }
- **PATCH User:** /api/v1/users/${userID}
{
// "name": "Vic",
// "email": "javier1@HOTMAIL.com"
// "role": "Student"
// "password": "HELLOWORLD"
}

- **DELETE User:** /api/v1/users/${userID}



## Purchase orders

- **GET Purchase Orders:** /api/v1/ordenes-de-compra
- **GET Purchase Orders by ID:** /api/v1/ordenes-de-compra/${purchaseOrderID}
- **POST Purchase Orders:** /api/v1/ordenes-de-compra
{
"total":  300,
"customerId":  "1234"
}
- **PATCH Purchase Orders:** /api/v1/ordenes-de-compra/${purchaseOrderID}
{
	"total":  50000
}
- **DELETE Purchase Orders:** /api/v1/ordenes-de-compra/${purchaseOrderID}
- **POST add item:** /api/v1/ordenes-de-compra/add-item
	- Body: 
{
	"orderId":  "8Gvg",
	"productId":  "dy_u",
	"amount":  "2"
}

- 

## Customers
- **GET Customers:** /api/v1/customers
- **GET Customer by ID:** /api/v1/customers/${customerID}
- **POST Customer:** /api/v1/customers
{
"name":  "Victor",
"lastName":  "Guzman",
"phone":  "9999999999"  ,
"userId":  "i3As"
}
- **PATCH Customer:** /api/v1/customers/${customerID}
{
// "name": "Angel",
// "lastName": "Guzman",
// "phone": "4444444444"
"userId":  "aljd"
}
- **DELETE Customers:** /api/v1/customers/${customerID}



# Deploy de la DB con Railway

Link de la DB mysql remota: https://railway.app/project/de0d7813-fd2b-4531-9cdc-439b9374b2ee
