# TextEditor

## Start application

`npm start`

## Runs on

http://localhost:1337

## Deployed on

https://jsramverk-editor-frpe21.azurewebsites.net/docs

## Documents

A document has the following attributes:

--------
_id

title

description

--------
## Endpoints

### Main page
`/`

Displays a main page

### Display all documents
`http://localhost:1337/docs`

* GET request to show all documents within the database

### Create a document

`http://localhost:1337/docs/create`
* POST request to insert one document

    - Required parameters
        - title
        - description  

### Get document by id
`http://localhost:1337/docs/edit/:id`

* GET request to display details of one document
### Update a document

`http://localhost:1337/docs/edit/:id`

* PUT request to update one document

    - Required parameters
        - id

    - Optional parameters
        - title
        - description

### 

### Database setup

`http://localhost:1337/docs/init`

- POST Will insert 4 documents with lorem ipsum text
    - parameters provided by data/docs.json