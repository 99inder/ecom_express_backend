<h1 align="center">
OPEN API ENDPOINTS
</h1>

### POST: /api/auth/register

**Description:**
This endpoint allows users to register for an account.

**Request:**
- **HTTP Method:** POST
- **URL:** `/api/auth/register`

**Request Body:**
```json
{
  "username": "string", // User's username
  "password": "string", // User's password
  "type": "string" // User type, either "buyer" or "seller"
}
```

### POST: /api/auth/login

**Description:**
This endpoint allows users to log in to their account.

**Request:**
- **HTTP Method:** POST
- **URL:** `/api/auth/login`

**Request Body:**
```json
{
  "username": "string",  // User's username
  "password": "string"      // User's password
}
```
<h1 align="center">
  PROTECTED ENDPOINTS
</h1>
<h1 align="left">
  BUYER ENDPOINTS
</h1>

### GET: /api/buyer/list-of-sellers

**Description:**
This endpoint allows authenticated buyers to retrieve a list of sellers.

**Authentication:**
Buyers must be authenticated to access this endpoint. The authentication token is automatically stored in cookies when the user logs in.

**Request:**
- **HTTP Method:** GET
- **URL:** `/api/buyer/list-of-sellers`

**Response:**
```json
{
  "success": true, // Indicates the success of the request
  "message": "All seller fetched successfully.", // A description or message related to the response
  "data": [
    {
      "_id": "string", // Unique identifier for the seller
      "username": "string" // Seller's username
    }
  ]
}
```

### GET: /api/buyer/seller-catalog/:seller_id

**Description:**
This endpoint allows authenticated buyers to retrieve a seller's catalog based on the seller's ID.

**Authentication:**
Buyers must be authenticated to access this endpoint. The authentication token is automatically stored in cookies when the user logs in.

**Request:**
- **HTTP Method:** GET
- **URL:** `/api/buyer/seller-catalog/:seller_id`

**URL Parameters:**
- `:seller_id` (string) - The unique identifier of the seller whose catalog you want to retrieve. This parameter is included in the URL.

**Response:**
```json
{
  "success": true, // Indicates the success of the request
  "message": "Seller Catalog Fetched Successfully", // A description or message related to the response
  "catalog": [
    {
      "_id": "string", // Unique identifier for an item in the catalog
      "name": "string", // Item name
      "price": 0, // Item price
      "sellerId": "string", // Unique identifier of the seller
      "__v": 0 // Version identifier (if applicable)
    }
  ]
}

```

### POST: /api/buyer/create-order/:seller_id

**Description:**
This endpoint allows authenticated buyers to create an order with a specified seller and a list of items.

**Authentication:**
Buyers must be authenticated to access this endpoint. The authentication token is automatically stored in cookies when the user logs in.

**Request:**
- **HTTP Method:** POST
- **URL:** `/api/buyer/create-order/:seller_id`

**URL Parameters:**
- `:seller_id` (string) - The unique identifier of the seller for whom you want to create an order. This parameter is included in the URL.

**Request Body:**
```json
{
  "items": [
    "string"
  ]  // array containing the item ids that you wish to order from a particular seller
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order Created Successfully",  // A description or message related to the response
  "data": {
    "orderId": "string"  // A unique identifier for the order created
  }
}
```

<h1 align="left">
  SELLER ENDPOINTS
</h1>

### POST: /api/seller/create-catalog

**Description:**
This endpoint allows authenticated sellers to create a catalog of items.

**Authentication:**
Sellers must be authenticated to access this endpoint. The authentication token is automatically stored in cookies when the user logs in.

**Request:**
- **HTTP Method:** POST
- **URL:** `/api/seller/create-catalog`

**Request Body:**
```json
{
  "items": [
    {
      "name": "string", // Item name
      "price": 0       // Item price
    },
    {
      "name": "string", // Another item name
      "price": 0       // Another item price
    }
  ]
}
```

**Response:**
```json
{
  "success": true, // Indicates the success of the request
  "message": "Catalog Created Successfully" // A description or message related to the response
}
```

### GET: /api/seller/orders

**Description:**
This endpoint allows authenticated buyers to fetch their orders.

**Authentication:**
Buyers must be authenticated to access this endpoint. The authentication token is automatically stored in cookies when the user logs in.

**Request:**
- **HTTP Method:** GET
- **URL:** `/api/seller/orders`

**Response:**
```json
{
  "success": true, // Indicates the success of the request
  "message": "Orders fetched successfully", // A description or message related to the response
  "data": [
    {
      "_id": "string", // Unique identifier for the order
      "buyerId": {
        "_id": "string", // Unique identifier for the buyer
        "username": "string" // Buyer's username
      },
      "itemsId": [
        {
          "_id": "string", // Unique identifier for an item in the order
          "name": "string" // Item name
        },
        {
          "_id": "string", // Unique identifier for another item in the order
          "name": "string" // Another item name
        }
      ]
    }
  ]
}
```
<span style="background-color: #c7ffd8; padding: 2px 5px;">GET</span>
