# Food Truck TrackR Backend

## Diner Schema

{

  dinerId: integer,

  username: string,

  password: string,

  email: string,

  currentLocation: string '<latitude>,<longitude>',
  
  favoriteTrucks: array of truck objects

}

## Operator Schema

{

operatorId: integer,

username: string,

password: string,

email: string,

trucksOwned: array of truck objects

}

## Truck Schema

{

id: integer,

name: string,

imageOfTruck: string,

cuisineType: string,

currentLocation: string,

departureTime: date and time (in ms since 1/1/70),

operatorId: integer,

menu: array of menuItem objects,

customerRatings: array of customerRating values (integers),

customerRatingsAvg: integer

}

## Menu Item Schema

{

id: integer,

menuId: integer,

itemName: string,

itemDescription: string,

itemPrice: integer

itemPhotos: array of URLs (strings),

customerRatings: array of customerRating values (integers),

customerRatingsAvg: integer

}

## API

POST /api/auth/register/diner - This creates a new diner
  - req.body: username, password, and email are required, currentLocation is optional
  - returns the new diner that was created

POST /api/auth/register/operator - This creates a new operator
  - req.body: username, password, and email are required
  - returns the new operator that was created

POST /api/auth/login - This authenticates a diner or operator
  - req.body: username and password are required
  - returns a JSON web token, user type (either diner or operator), and the user's diner or operator object - include { 'authorization': 'Bearer <token>' } in request headers to   access restricted endpoints

GET /api/trucks - restricted, returns an array of all trucks

GET /api/trucks/:id - restricted, returns the truck with the given id

POST /api/trucks - restricted, creates a new truck
  - req.body: name, imageOfTruck, cuisineType, currentLocation, and operatorId are required, departureTime defaults to current time if not provided
  - returns the new truck that was created

PUT /api/trucks/:id - restricted, updates the truck with the given id

DELETE /api/trucks/:id - restricted, deletes the truck with the given id

GET /api/trucks/:id/menu - restricted, returns an array of the menuItems from the menu for the truck with the given id

POST /api/trucks/:id/menu - restricted, adds a menuItem to the menu for the truck with the given id
  - req.body: itemName, itemDescription, and itemPrice are required
  - returns the menuItem added to the menu

PUT /api/trucks/:truckId/menu/:menuItemId - restricted, updates the menuItem with the given menuItemId
  - returns the updated menuItem
  
DELETE /api/trucks/:truckId/menu/:menuItemId - restricted, removes the menuItem with the given menuItemId

POST /api/trucks/:truckId/customerRatings/:dinerId - restricted, adds (or replaces) a customerRating for the truck with the given truckId associated with the diner with the given dinerId
  - req.body: customerRating is required
  - returns the array of customerRatings for the truck with the given truckId

POST /api/trucks/:truckId/menu/:menuItemId/customerRatings/:dinerId - restricted, adds (or replaces) a customerRating for the menuItem with the given menuItemId associated with the diner with the given dinerId
  - req.body: customerRating is required
  - returns the array of customerRatings for the menuItem with the given menuItemId

POST /api/trucks/:truckId/menu/:menuItemId/itemPhotos - restricted, adds a url (string) to the itemPhotos array for the menuItem with the given id
  - req.body: a url (string) is required
  - returns the updated array of itemPhotos

DELETE /api/trucks/:truckId/menu/:menuItemId/itemPhotos - restricted, removes a url (string) from the itemPhotos array for the menuItem with the given id
  - req.body: a url (string) is required
  - returns the updated array of the itemPhotos

GET /api/diners/:id - restricted, returns the diner with the given id

PUT /api/diners/:id - restricted, updates the currentLocation of the diner with the given id
  - req.body: a currentLocation (string with the format ',') is required
  - returns the updated diner

GET /api/diners/:id/favoriteTrucks - restricted, returns an array of favoriteTrucks of the diner with the given id

POST /api/diners/:id/favoriteTrucks - restricted, adds a truck to the array of favoriteTrucks of the diner with the given id
  - req.body: truckId is required
  - returns the updated array of favoriteTrucks of the diner with the given id

DELETE /api/diners/:id/favoriteTrucks - restricted, deletes a truck from the array of favoriteTrucks of the diner with the given id
  - req.body: truckId is required
  - returns the updated array of the diner's favoriteTrucks

GET /api/operators/:id - restricted, returns the operator with the given id

GET /api/operators/:id/trucksOwned - restricted, returns an array of trucks owned by the operator with the given id
