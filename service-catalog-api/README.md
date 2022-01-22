# service-catalog
Service - catalog is a centralized catalog of services allowing you to discover and manage services

## Steps to make it works
1. `pkg/api/middlewares/middlewares.go` file should contains provided secure string for JWT purposes (line 11). We recommend to store it safely.
2. `pkg/database/connection.go` file should contains url link to *mongoDB* database (line 14). 

## Services endpoints
| METHOD | Endpoint name  | Description                           | Input                                                 | Output  |
|--------|----------------|---------------------------------------|-------------------------------------------------------|---------|
| POST   | /addService    | Adds single service                   | JSON object (Entry) as body payload             |Status 201 - Body (Newly created service as JSON object(Entry))|
| DELETE   | /deleteService | Deletes single service of chosen id | JSON object id = ? as body payload              |Status 200 - Body ("Removed")         |
| POST   | /updateService | Updates single service of chosen id   | JSON object (Entry) as body payload             |Status 200 - Body (Updated service as JSON object(Entry))         |
| GET    | /listServices  | Lists all aviable services            | page = ? as Query param   eg. /lisetServices?page=3                                               |Status 200 - Body (JSON Array of service objects(Entry))       |
| GET    | /getService    | Returns single service of chosen name | name as a query param eg. /getService?name=1234 |Status 200 - Body (Service as JSON object(Entry))         |
## User endpoints
| METHOD | Endpoint name | Description                         | Input                                        | Output          |
|--------|---------------|-------------------------------------|----------------------------------------------|-----------------|
| POST   | /addUser      | Adds user                           | JSON object (User) as body payload     |Status 201 - Body ( Newly created user as JSON object(User) )|
| GET    | /listUsers    | Deletes single service of chosen id | -                                            |Status 200 - Body ( JSON Array of User objects(User))       |
| GET    | /updateUser   | Updates user                        | JSON object (Entry) as body payload    |Status 200 - Body ( Updated user as JSON object(User) )|
| POST   | /loginUser    | Log in user                         | JSON object (User) as body body payload      |Status 201 - Body ( Logged user info as JSON object (User)) |

# Schemas
Label
| Name              | Type               |
|-------------------|--------------------|
| ID                | uint8              |
| Name              | string             |  

Entry
| Name              | Type               | Provided by user|
|-------------------|--------------------|-----------------|
| ID                | primitive.ObjectID |❌|
| Name              | string             |✔️|
| ShortName         | string             |✔️|
| RepositoryURL     | string             |✔️|
| Labels            | [ ]Label           |✔️|
| Codeowners        | [ ]string          |✔️|
| DocumentationURLs | [ ]string          |✔️|
| TimestampAdded    | time.Time          |❌|
| TimestampChanged  | time.Time          |❌|

User
| Name             | Type               | Provided by user |
|------------------|--------------------|------------------|
| ID               | primitive.ObjectID |❌|
| UserName         | string             |✔️|
| Email            | string             |✔️|
| Password         | string             |✔️|
| IsAdmin          | bool               |❌|
| Token            | string             |❌|
| RefreshToken     | string             |❌|
| TimestampAdded   | time.Time          |❌|
| TimestampChanged | time.Time          |❌|

JwtCustomClaims
| Name              | Type               |
|-------------------|--------------------|
| ID                | primitive.ObjectID |
| Name              | string             |
| Admin             | bool               |
| Name              | string             |
| Audience          | string             |
| ExpiresAt         | int64              |
| Id                | string             |
| IssuedAt          | int64              |
| Issuer            | string             |
| NotBefore         | int64              |
| Subject           | string             |

