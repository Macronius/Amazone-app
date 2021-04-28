# Amazone-app

follow-along with Coding with Basir - mainly to learn how version control works

1. Introduction
2. Install Tools
   1. Code Editor
   2. Web Browser
   3. VS Code Extension
3. Website Template
   create amazona folder
   create template folder
   create index.html
   add default html code
   link to style.css
   create header, main and footer
   style elments
4. Display Products
   1. create products div
   2. add product attributes
   3. add link, image, name, and price
5. Create React App
   1. npx create-react-app frontend
   2. npm start
   3. Remove unused files
   4. copy index.html content to App.js
   5. copy style.css content to index.css
   6. replace class with className
6. Share Code On Github (connect to github @ 1:00:00)
   1. Initialize git repository
   2. Commit changes
   3. Create github account
   4. Create repo on github
   5. connect local repo to github repo
   6. push changes to github
      -dont forget to right-click 'package-lock.json' to add to .gitignore
7. Create Rating and Product Component
   1. create components/Ratings.js
   2. create div.rating
   3. style div.rating, spane and last span
   4. create Product component
   5. Use Rating component
8. Build Product Screen
   1. install react-router-dom
   2. use BrowseRouter and Route for Home screen
   3. create HomeScreen.js
   4. add product list code there
   5. create ProductScreen.js
   6. add new Route from product details to App.js
   7. create 3 columns for: product image, info and action
9. Create Node.JS Server
    1. run npm init in root folder
    2. Update package.json set type: module
    3. Add .js to imports
    4. npm install express
    5. create server.js (entry point of the backend application) / next create express server application
    6. add start command as: node backend/server.js NOTE: will receive error: SyntaxError: (Cannot use import statement outside a module) to fix, go to package.json, beneath name: add "type":"module",
    7. require express
    8. create route for / return backend is ready.
    9. move products.js from frontend to backend
    10. create route for /api/products
    11. return products
    12. run npm start
10. Load Products From Backend

    1. edit HomeScreen.js NOTE: instead of fetching data from the data.js in the frontend, we will instead fetch from /api/products from the backend
    2. define products, loading and error.
    3. create useEffect
    4. define async fetchData and call it
    5. get data from /api/products
       get rid of all the static data in the frontend (as it now comes from the backend
    6. show them in the list
    7. create Loading Component
    8. create Message Box Component
    9. use them in HomeScreen

11. Install ESlint For Code Linting

    1. install VSCode eslint extension
    2. npm install -D eslint
    3. run ./node_modules/.bin/eslint --init
    4. Create ./frontend/.env
    5. Add SKIP_PREFLIGHT_CHECK=true

12. Add Redux to Home Screen

    1. cd frontend > npm install redux react-redux
    2. Create store.js
       - to create a store, need two things: initial state (initially and empty object) & reducer (a function that accepts two parameters: (state & action), then returns a new state (return products from data object))
    3. initState= {products:[]}
    4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
    5. export default store;
    6. export default createStore(reducer, initState)

    - next. go to index.js (entry point of the app) and wrap with <Provider store={store}></Provider>
    - next. install 'redux devtools' to chrome browser
    - next. in terminal, while in frontend folder -> npm install redux-thunk (makes it possible to send ajax requests in our redux actions)

    6. Edit HomeScreen.js
    7. shopName = useSelector(state=>state.products)
    8. const dispatch = useDispatch()
    9. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data})
    10. Add store to index.js

13. Add Redux to Product Screen

    1. create product details:

    - constants
    - actions
    - reducers

    2. add reducer to store.js
    3. use action in ProductScreen.js
    4. add /api/product/:id to backend api

14. Handle Add To Cart Button

    1. Handle Add To Cart in ProductScreen.js
    2. create CartScreen.js

15. Implement Add To Cart Action

    1. create addToCart constants, actions and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
    4. render cartItems.length

16. Build Cart Screen

    1. create 2 columns for cart items and cart action
    2. cartItems.length === 0 ? cart is empty
    3. show item image, name, qty and price
    4. Proceed to Checkout button
    5. Implement remove from cart action

17. Implement Remove From Cart

    1. create removeFromCart constants('CART_REMOVE_ITEM'), actions(CART_REMOVE_ITEM)(update cart item&local storage and remove selected item) and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js

18. Create Sample Users in MongoDB
    1. npm install mongoose (in the root directory)
    - create a model; in the backend directory, create folder called 'models'
        - create a schema
        - create a model
        - export
    - create a seed API to create an admin user
        - create router
        - update data.js from backend to include users
            - note: passwords must be incrypted
            - npm install bcryptjs
            - import bcrypt from 'bcryptjs'
        - define a get method for seed API
    2. connect server.js to mongodb
        - in server.js
            - import express and mongoose
            - mongoose.connect()
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create models/productModel.js
    9. create productSchema and productModel
    10. create userRoute
    11. Seed sample data
    12. npm install express-async-handler
        - to solve issue of page, upon refresh of creating Admin, continuously loading with error

19. Create Sample Products in MongoDB
    1. create models/productModel.js
    2. create productSchema and productModel
    3. create productRoute
    4. Seed sample data

20. Create Sign-in Backend
    http://localhost:5000/api/users/signin
    1. create /signin api
    2. check email and password
    3. generate token
    4. npm install jsonwebtoken (generates a hash-stream)
    5. create utils.js inside backend folder
        - define some utility functions
            -generateToken
    6. create .env file in root folder
        - right-click .env > add to .gitignore from the version control system
    7. npm install dotenv
        - needed for the utils.js file to read the .env file
        - to use the contens of .env and read it in the utils.js variable, must configure dotenv in server.js
            - not secure to store there
            - will exist on computer...
    8. return token and data
    9. test using postman
        - because you cannot test 'post' request using browser