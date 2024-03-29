# News feed with endless news loading

### The news feed is written using a **react** and **angular**. Main features:

- Articles don't load all at once. Articles are loaded when the scroll approaches the bottom of the browser screen.
- Articles consist of a title and a body. The body can contain text, links and images in any order and in any quantity
- Each article has a category. The list of categories is received from the server
- An article can contain multiple tags
- It is possible to sort the display by categories and tags
- Search by the content of articles is implemented
- There is a section of recommended articles. Recommended articles come from the server

It is possible to create an account on the site. Registration provides the following advantages:

- Ability to set categories that will be ignored. Articles with the selected categories will not be displayed, and the
  selected categories will disappear from the category list.
- Ability to set tags that will be ignored. Articles containing such tags will not be displayed

The ability to change the user's name and password is implemented. The user with ID 1 is an administrator. Also,
the administrator's authorization will not be saved when the page is reloaded for security

Known disadvantages:

- Since the server part is performed by the Json Server, the server's capabilities are very limited, and most of the
  server functions are performed by the frontend. This leads to a loss of performance and security vulnerabilities
- Since there is no email server, password recovery has a formal form
- Big design problems
- HTTP request error tracking has not been implemented yet

At the first run fake server, in fake-server" folder run

```
npm run start
```

To launch the public part of application, in "react-main" folder run

```
npm run start
```

To launch the admin part of application, in "admin-angular" folder run

```
ng start
```


The server will start at http://localhost:3030/
The public part of application will launch at http://localhost:3000/
The admin part of application will launch at http://localhost:4200/

There is a small delay on the server to be able to see the data loading spinner
