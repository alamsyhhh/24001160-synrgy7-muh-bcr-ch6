# Binar Car Rental

## Guide to Run 
* `npm i` to install all the dependencies
* Don't forget to make your own `.env`
* When its finish:
    * `npm run build` to compile all these typescript things
    * `npm run dev` to run the server ⚡

## About Migrations and Seeds
* `knex migrate:latest` to run the migration's file
* `knex seed:run` to fill data on database

## Entity Relationship Diagram

For now only one table is available: <br>
https://dbdiagram.io/d/challenge_5-664307bc9e85a46d55c75833 <br> <br>
![Table Car](challenge_5.png) <br>

## API ENDPOINT LIST

| API ENDPOINT              | METHOD   |     DESCRIPTION        |
|---------------------------|----------|------------------------|
| `api/v1/cms/api/cars`     |   `GET`  | Get All Cars Data      |
| `api/v1/cms/api/cars/:id` |   `GET`  | Get By Id Cars Data    |
| `api/v1/cms/api/cars/`    |  `POST`  | Create Cars Data       |
| `api/v1/cms/api/cars/:id` |   `PUT`  | Update Cars Data By Id |
| `api/v1/cms/api/cars/:id` | `DELETE` | Delete Cars Data By Id |

## REST API Endpoints
-----------------------
### Get All Cars

- **Show All Data Cars**
    - **Request** 
        - Endpoint : `/api/v1/cms/cars`
        - method : `GET`
    - **Get Data Success**
        - Request :
          ```
          curl --location 'http://localhost:9000/api/v1/cms/cars'
          ```
        - Response :
          ```
          HTTP/1.1 200 OK
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 3435
          ETag: W/"d6b-nRkKBNBKlg+I6QJt9zbZuMW1d34"
          Date: Sat, 18 May 2024 17:09:57 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5

          {
             "status": 200,
             "message": "Get all car data successfully",
             "data": {
                 "cars": [
                     {
                         "id": "3d71f905-cd6d-447c-86e6-c5cb19159a45",
                         "name": "Nissan Altima",
                         "category": "Medium",
                         "price": 10000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "fb4b1e5c-4add-470d-9a2c-d1bdcce4fb38",
                         "name": "Chevrolet Camaro",
                         "category": "Small",
                         "price": 100.05,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "06b34192-0936-4b96-a859-85f20d2b08c5",
                         "name": "Volkswagen Golf",
                         "category": "large",
                         "price": 20000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "8d2035fe-abe0-46eb-9b7a-40369e9132ce",
                         "name": "Tesla Model S",
                         "category": "Small",
                         "price": 30000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "ba2204d7-0728-4131-85a6-cf88ead91074",
                         "name": "BMW X5",
                         "category": "large",
                         "price": 400.05,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "a72a6697-ade3-442a-9f49-3debe9d5aaa1",
                         "name": "Audi Q7",
                         "category": "small",
                         "price": 50.05,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "76115319-b08b-48c5-858f-7a6c3d454f98",
                         "name": "Mercedes-Benz C-Class",
                         "category": "large",
                         "price": 500000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "dcef4300-21f7-4fcf-afe3-30cbc174e25f",
                         "name": "Toyota RAV4",
                         "category": "medium",
                         "price": 30000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "ffeb9e55-22a8-46c8-856b-75061b23b67c",
                         "name": "Ford F-150",
                         "category": "small",
                         "price": 30000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "5ccdb6ec-6d09-410f-9618-0b301e80a875",
                         "name": "Honda Accord",
                         "category": "small",
                         "price": 40000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "9eb35667-f923-4940-a4cf-3cd8db99b00e",
                         "name": "ferrari",
                         "category": "large",
                         "price": 4000000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     }
                 ]
             }
          }
          ```

   - **Show All Data Cars By Name**
    - **Request** 
        - Endpoint : `/api/v1/cms/cars`
        - Params : `name`
        - method : `GET`
    - **Get Data Success**
        - Request :
          ```
          curl --location 'http://localhost:9000/api/v1/cms/cars?name=Ferrari'
          ```
        - Response :
          ```
          HTTP/1.1 200 OK
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 391
          ETag: W/"187-8eVulT+C7Zew15Au5bC3/mM4PjA"
          Date: Sat, 18 May 2024 17:15:28 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5

            {
                "status": 200,
                "message": "Get all car data successfully",
                "data": {
                    "cars": [
                        {
                            "id": "9eb35667-f923-4940-a4cf-3cd8db99b00e",
                            "name": "ferrari",
                            "category": "large",
                            "price": 4000000,
                            "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                            "startRent": null,
                            "finishRent": null,
                            "createdAt": "2024-05-18T13:32:02.568Z",
                            "updatedAt": "2024-05-18T13:32:02.568Z"
                        }
                    ],
                    "totalPages": 1
                }
            }
          ```

  - **Show All Data Cars By Category**
    - **Request** 
        - Endpoint : `/api/v1/cms/cars`
        - Params : `category`
        - method : `GET`
    - **Get Data Success**
        - Request :
          ```
          curl --location 'http://localhost:9000/api/v1/cms/cars?category=large'
          ```
        - Response :
          ```
          HTTP/1.1 200 OK
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 1314
          ETag: W/"522-8jjnfGXXVzc/gkQZTAtnRZgHOgc"
          Date: Sat, 18 May 2024 17:16:21 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5

            {
             "status": 200,
             "message": "Get all car data successfully",
             "data": {
                 "cars": [
                     {
                         "id": "06b34192-0936-4b96-a859-85f20d2b08c5",
                         "name": "Volkswagen Golf",
                         "category": "large",
                         "price": 20000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "ba2204d7-0728-4131-85a6-cf88ead91074",
                         "name": "BMW X5",
                         "category": "large",
                         "price": 400.05,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "76115319-b08b-48c5-858f-7a6c3d454f98",
                         "name": "Mercedes-Benz C-Class",
                         "category": "large",
                         "price": 500000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "9eb35667-f923-4940-a4cf-3cd8db99b00e",
                         "name": "ferrari",
                         "category": "large",
                         "price": 4000000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     }
                 ],
                 "totalPages": 1
             }
          }
          ```

   - **Show All Data Cars With Pagination**
    - **Request** 
        - Endpoint : `/api/v1/cms/cars`
        - Params : `page`
                 : `pageSize`
        - method : `GET`
    - **Get Data Success**
        - Request :
          ```
          curl --location 'http://localhost:9000/api/v1/cms/cars?page=1&pageSize=10'
          ```
        - Response :
          ```
          HTTP/1.1 200 OK
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 3148
          ETag: W/"c4c-V46yHCfeEqcvGcS1bzGcC9bbEuo"
          Date: Sat, 18 May 2024 17:17:02 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5

            {
             "status": 200,
             "message": "Get all car data successfully",
             "data": {
                 "cars": [
                     {
                         "id": "3d71f905-cd6d-447c-86e6-c5cb19159a45",
                         "name": "Nissan Altima",
                         "category": "Medium",
                         "price": 10000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "fb4b1e5c-4add-470d-9a2c-d1bdcce4fb38",
                         "name": "Chevrolet Camaro",
                         "category": "Small",
                         "price": 100.05,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "06b34192-0936-4b96-a859-85f20d2b08c5",
                         "name": "Volkswagen Golf",
                         "category": "large",
                         "price": 20000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "8d2035fe-abe0-46eb-9b7a-40369e9132ce",
                         "name": "Tesla Model S",
                         "category": "Small",
                         "price": 30000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "ba2204d7-0728-4131-85a6-cf88ead91074",
                         "name": "BMW X5",
                         "category": "large",
                         "price": 400.05,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.567Z",
                         "updatedAt": "2024-05-18T13:32:02.567Z"
                     },
                     {
                         "id": "a72a6697-ade3-442a-9f49-3debe9d5aaa1",
                         "name": "Audi Q7",
                         "category": "small",
                         "price": 50.05,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "76115319-b08b-48c5-858f-7a6c3d454f98",
                         "name": "Mercedes-Benz C-Class",
                         "category": "large",
                         "price": 500000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "dcef4300-21f7-4fcf-afe3-30cbc174e25f",
                         "name": "Toyota RAV4",
                         "category": "medium",
                         "price": 30000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "ffeb9e55-22a8-46c8-856b-75061b23b67c",
                         "name": "Ford F-150",
                         "category": "small",
                         "price": 30000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     },
                     {
                         "id": "5ccdb6ec-6d09-410f-9618-0b301e80a875",
                         "name": "Honda Accord",
                         "category": "small",
                         "price": 40000,
                         "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                         "startRent": null,
                         "finishRent": null,
                         "createdAt": "2024-05-18T13:32:02.568Z",
                         "updatedAt": "2024-05-18T13:32:02.568Z"
                     }
                 ],
                 "totalPages": 2
             }
          }
          ```
-----------------------
### Get Car by ID

- **Show Data Cars By Id**
    - **Request** 
        - Endpoint : `api/v1/cms/api/cars/:id`
        - method : `GET`
    - **Get Data Success**
        - Request :
          ```
          curl --location 'http://localhost:9000/api/v1/cms/cars/ffeb9e55-22a8-46c8-856b-75061b23b67c'
          ```
        - Response :
          ```
          HTTP/1.1 200 OK
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 368
          ETag: W/"170-ZHiUxMyt15IW5oQuMQ8PY36r2KI"
          Date: Sat, 18 May 2024 17:18:41 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5
            
            {
                "status": 200,
                "message": "Get car data by ID successfully",
                "data": {
                    "id": "ffeb9e55-22a8-46c8-856b-75061b23b67c",
                    "name": "Ford F-150",
                    "category": "small",
                    "price": 30000,
                    "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400118/img_car_lhk3me.png",
                    "startRent": null,
                    "finishRent": null,
                    "createdAt": "2024-05-18T13:32:02.568Z",
                    "updatedAt": "2024-05-18T13:32:02.568Z"
                }
            }
          ```
    - **Get Data Not Found**
        - Request :
          ```
          curl -i --location 'http://localhost:9000/api/v1/cms/cars/ffeb9e55-22a8-46c8-856b-75061b23b67c'
          ```
        - Response :
          ```
          HTTP/1.1 404 Not Found
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 62
          ETag: W/"3e-KYeLGRwzHcH3cqYBxhq/ZE6xO14"
          Date: Sat, 18 May 2024 17:19:46 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5
            
          {
             "status": 404,
             "message": "Car with the specified ID not found"
          }
          ```
-----------------------
### Create Car 

- **Insert Data Car**
    - **Request**
        - Endpoint : `/api/v1/cms/cars`
        - Body : `form-data`
        - Method : `POST`
    - **Post Data Success**
        - Request :
          ```
          curl --location 'http://localhost:9000/api/v1/cms/cars' \
          --form 'name="test"' \
          --form 'category="large"' \
          --form 'price="dd"' \
          --form 'image=@"/C:/Users/ASUS/Downloads/screencapture-localhost-8000-cars-2024-05-05-02_29_53.png"' \
          --form 'startRent="2012/03/05"' \
          --form 'finishRent="2012/04/05"'
          ```
        - Response :
          ```
          HTTP/1.1 201 Created
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 420
          ETag: W/"1a4-w4G+vCXEoPg106chwpPDp3b5Ad8"
          Date: Sat, 18 May 2024 17:22:21 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5
            
            {
                "status": 201,
                "message": "Data Berhasil Disimpan",
                "data": {
                    "id": "e9b52c80-0589-4d4c-abe3-7e86e7da63c3",
                    "name": "test",
                    "category": "large",
                    "price": "300000",
                    "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1716046962/challenge_5/1716046956934_qy5VSocr..png",
                    "startRent": "2012-03-04T17:00:00.000Z",
                    "finishRent": "2012-04-04T17:00:00.000Z",
                    "createdAt": "2024-05-18T15:42:43.103Z",
                    "updatedAt": "2024-05-18T15:42:43.103Z"
                }
            }
          ```
          
   - **Post Data Failed Validation (type data image not valid)**
      - Request :
        ```
        curl -i --location 'http://localhost:9000/api/v1/cms/cars' \
          --form 'name="Ferrari"' \
          --form 'category="small"' \
          --form 'price=200000' \
          --form 'image=@"/C:/Users/ASUS/Downloads/Cetak Kartu Rencana Studi - Portal UAD (2).pdf"' \
          --form 'startRent="2024-05-14"' \
          --form 'finishRent="2024-05-20"
        ```
      - Response :
        ```
        HTTP/1.1 400 Bad Request
        X-Powered-By: Express
        Content-Type: application/json; charset=utf-8
        Content-Length: 87
        ETag: W/"57-SPQIwdH1ydiLSja/x2IoAXN+2g4"
        Date: Sat, 18 May 2024 17:23:13 GMT
        Connection: keep-alive
        Keep-Alive: timeout=5
        
        {
             "status": 400,
             "message": "Hanya diperbolehkan untuk mengunggah file gambar (JPG, PNG)!"
        }
        ```

 - **Post Data Failed Validation (multiple image)**
      - Request :
        ```
        curl --location 'http://localhost:9000/api/v1/cms/cars' \
        --form 'name="test"' \
        --form 'category="large"' \
        --form 'price="10000"' \
        --form 'image=@"/C:/Users/ASUS/Downloads/screencapture-localhost-8000-cars-2024-05-05-02_29_53.png"' \
        --form 'image=@"/C:/Users/ASUS/Downloads/screencapture-localhost-8000-cars-2024-05-05-02_29_53.png"' \
        --form 'startRent="2012/03/05"' \
        --form 'finishRent="2012/04/05"'
        ```
      - Response :
        ```
        HTTP/1.1 400 Bad Request
        X-Powered-By: Express
        Content-Type: application/json; charset=utf-8
        Content-Length: 75
        ETag: W/"4b-1itSLJbI+moDHOpfQ2cqcWxuJDM"
        Date: Sat, 18 May 2024 17:25:12 GMT
        Connection: keep-alive
        Keep-Alive: timeout=5
        
        {
             "status": 400,
             "message": "Unexpected field. Please check your file upload."
        }
        ```

    - **Post Data Failed**
      - Request :
        ```
        curl --location 'http://localhost:9000/api/v1/cms/cars' \
        --form 'name="test"' \
        --form 'category="large"' \
        --form 'price="rr"' \
        --form 'image=@"/C:/Users/ASUS/Downloads/screencapture-localhost-8000-cars-2024-05-05-02_29_53.png"' \
        --form 'startRent="2012/03/05"' \
        --form 'finishRent="2012/04/05"'
        ```
      - Response :
        ```
        HTTP/1.1 500 Internal Server Error
        X-Powered-By: Express
        Content-Type: application/json; charset=utf-8
        Content-Length: 48
        ETag: W/"30-tWHkHI2xOr172yUbsPL0eLhF93U"
        Date: Sat, 18 May 2024 17:26:19 GMT
        Connection: keep-alive
        Keep-Alive: timeout=5
        
        {
             "status": 500,
             "message": "Internal Server Error"
        }
        ```
-----------------------

### Edit Car Data with ID 

- **Update Data Cars**
    - **Request**
        - Endpoint : `/api/v1/cms/cars/:id`
        - Body : `form-data`
        - Method : `PUT`
    - **Update Data Success**
        - Request :
          ```
          curl --location --request PUT 'http://localhost:9000/api/v1/cms/cars/e9b52c80-0589-4d4c-abe3-7e86e7da63c3' \
          --form 'name="test 2"' \
          --form 'category="roro"' \
          --form 'price="1010"' \
          --form 'image=@"/C:/Users/ASUS/Downloads/screencapture-localhost-8000-cars-2024-05-05-02_29_53.png"' \
          --form 'startRent="2021/04/02"' \
          --form 'finishRent="2022/05/03"'
          ```
        - Response :
          ```
          HTTP/1.1 200 OK
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 420
          ETag: W/"1a4-1kp1r3/LSquFsMSLYkKUQjUD/UY"
          Date: Sat, 18 May 2024 17:29:16 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5
            
          {
             "status": 200,
             "message": "Car updated successfully",
             "data": {
                 "id": "e9b52c80-0589-4d4c-abe3-7e86e7da63c3",
                 "name": "test 2",
                 "price": 1010,
                 "category": "roro",
                 "image": "https://res.cloudinary.com/dmuuypm2t/image/upload/v1716047941/challenge_5/1716047936693_d5UfTi8s..png",
                 "startRent": "2021-04-01T17:00:00.000Z",
                 "finishRent": "2022-05-02T17:00:00.000Z",
                 "createdAt": "2024-05-18T15:42:43.103Z",
                 "updatedAt": "2024-05-18T15:59:02.306Z"
             }
          }
          ```
    - **Update Data Failed Not Found**
        - Request :
          ```
          curl --location --request PUT 'http://localhost:9000/api/v1/cms/cars/e9b52c80-0589-4d4c-abe3-7e86e7da63c' \
          --form 'name="test 2"' \
          --form 'category="roro"' \
          --form 'price="1010"' \
          --form 'image=@"/C:/Users/ASUS/Downloads/screencapture-localhost-8000-cars-2024-05-05-02_29_53.png"' \
          --form 'startRent="2021/04/02"' \
          --form 'finishRent="2022/05/03"'
          ```
        - Response :
          ```
          HTTP/1.1 404 Not Found
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 62
          ETag: W/"3e-KYeLGRwzHcH3cqYBxhq/ZE6xO14"
          Date: Sat, 18 May 2024 17:30:10 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5
        
          {
             "status": 404,
             "message": "Car with the specified ID not found"
          }
          ```
          
   - **Update Data Failed**
      - Request :
        ```
        curl --location --request PUT 'http://localhost:9000/api/v1/cms/cars/e9b52c80-0589-4d4c-abe3-7e86e7da63c3' \
          --form 'name="test 2"' \
          --form 'category="roro"' \
          --form 'price="1010"' \
          --form 'image=@"/C:/Users/ASUS/Downloads/screencapture-localhost-8000-cars-2024-05-05-02_29_53.png"' \
          --form 'startRent="2021/04/02"' \
          --form 'finishRent="2022/05/03"'
        ```
      - Response :
        ```
        HTTP/1.1 500 Internal Server Error
        X-Powered-By: Express
        Content-Type: application/json; charset=utf-8
        Content-Length: 48
        ETag: W/"30-tWHkHI2xOr172yUbsPL0eLhF93U"
        Date: Sat, 18 May 2024 17:31:46 GMT
        Connection: keep-alive
        Keep-Alive: timeout=5
        
        {
             "status": 500,
             "message": "Internal Server Error"
        }
        ```
-----------------------
### Delete Car with ID

- **Delete Data Cars**
    - **Request**
        - Endpoint : `/api/v1/cms/cars/:id`
        - Parameter : `:id`
        - Method : `DELETE`
    - **Delete Data Success**
        - Request :
          ```
          curl --location --request DELETE 'http://localhost:9000/api/v1/cms/cars/838745ea-bf05-47c7-89e4-aaebeb4aedaa'
          ```
        - Response :
          ```
          HTTP/1.1 200 OK
          X-Powered-By: Express
          Content-Type: application/json; charset=utf-8
          Content-Length: 48
          ETag: W/"30-omuH3S85tyc+9xA5vN1eCtNp1sg"
          Date: Sat, 18 May 2024 17:33:09 GMT
          Connection: keep-alive
          Keep-Alive: timeout=5
            
          {
             "status": 200,
             "message": "Data Berhasil Dihapus"
          }
          ```
    - **Delete Data Not Found**
       - Request :
         ```
         curl -i --location --request DELETE 'http://localhost:9000/api/v1/cms/cars/http://localhost:9000/api/v1/cms/cars/e9b52c80-0589-4d4c-abe3-7e86e7da63c'
         ```
       - Response :
         ```
         HTTP/1.1 404 Not Found
         X-Powered-By: Express
         Content-Type: application/json; charset=utf-8
         Content-Length: 62
         ETag: W/"3e-KYeLGRwzHcH3cqYBxhq/ZE6xO14"
         Date: Sat, 18 May 2024 17:33:36 GMT
         Connection: keep-alive
         Keep-Alive: timeout=5
            
         {
             "status": 404,
             "message": "Car with the specified ID not found"
         }
         ```

-----------------------
