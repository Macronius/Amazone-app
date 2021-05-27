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

21. Design SignIn Screen
    localhost:3000/signin

    1. create SignInScreen
    2. render email and password fields
    3. define a route for signin screen in App.js
    4. create signin constants, actions and reducers
    5. Update Header based on user login

22. Implement SignIn Action

    1. create signin constants, actions and reducers
    2. add reducer to store.js
    3. use action in SigninScreen.js

23. Create Register Screen

    1. create API for /api/users/register
    2. insert new user to database
    3. return user info and token
    4. create RegisterScreen
    5. Add fields
    6. Style fields
    7. Add screen to App.js
    8. create register action and reducer
    9. check validation and create user

24. Create Shipping Screen

    1. create CheckoutSteps.js component
    2. create shipping fields
    3. implement shipping constant, actions and reducers

25. Create Payment Screen

    1. create payment fields
    2. implement shipping constants, actions and reducers

26. Design Place Order Screen

    1. desgin order summary fields
    2. design order action

27. Create Place Order API /api/order
    1. createOrder api
    2. create orderModel
    3. create orderRouter
       3.b add to utils.js - to get info about user that created the order, define a middleware
    4. create past order route
28. Implement PlaceOrder Action

    - when user click on placeorder, a new action happens in the redux store and call the api for creating an order in the backend and redirect user to the order details page, also it calls cart empty to make the cart empty after placing the order

    1. handle place order button click
    2. create place order constants, action and reducer

29. Create Order Screen

    - after placing an order by user, need to show the order information in a new screen and make it possible for user to make payment

    1. build order api for /api/orders/:id
    2. create OrderScreen.js
    3. dispatch order details action in useEffect
    4. load data with useSelector
    5. show data like place order screen
    6. create order details constant, action and reducer

30. Add PayPal Button

    1. get client id from paypal
       - developer.paypal.com
       - login to dashboard
       - Dashboard > My Apps & Credentials
       - Sandbox > Create App (after everything works, go back and create a livekey instead of a sandbox key)
       - enter an App Name and Create App - to get a client ID
    2. set it in .env file
    3. create route from /api/paypal/clientId
       - the PAYPAL_CLIENT_ID is on the backend, but it is needed on the client, therefore solution is create an api to send from backend to frontend
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button - npm install react-paypall-button-v2
       NOTE: to get a paypal live key, just follow the above steps under 'live' option instead of 'sandbox' option, then take that key and replace in .env PAYPAL_CLIENT_ID

31. Implemennt Order Payment

    1. update order after payment
    2. create payment in api.js
    3. create route for /:id/pay in orderRouter.js
    4. rerender after pay order

32. Display Order History

    1. create customer orders api
    2. create api for getMyOrders
    3. show orders in profile screen
    4. style orders

33. Display User Profile

    1. create user details api
    2. show user information

34. Update User Profile

    1. create user update api
    2. update user info

35. Create Admin View

    1. create Admin menu
    2. create Admin middleware in backend
    3. create AdminRoute in frontend

36. List Products for Admin

    1. Create Product List Screen
    2. Add reducer to store
    3. show products on the screen

37. Create Product

    1. build create product api
    2. built Create Product button
    3. define product create constant, action and reducer
    4. use action in ProductListScreen

38. Build Product Edit Screen

    1. create edit screen
    2. define state
    3. create fields
    4. load product details
    5. add to routes

39. Update Product

    1. define update api
    2. define product update constant, action and reducer
    3. use action in Product Edit Screen

40. Upload Product Image

    1. npm install multer to manage upload file, download the package
    2. define uploadRouter.js
    3. create uploads folder
    4. Handle frontend (define constants, actions and reducers)

41. Delete Product

    1. create delete api in backend
    2. create delete constants, action and reducer
    3. use it in product list screen
       (as admin, delete product, get are you sure, delete from homepage, product list)

42. List Orders (orders placed by customers)

    1. create order list api
    2. create OrderList screen
    3. add reducer to store
    4. show products on the screen

43. Delete Order
    1. create orderRouter.delete() api
    2. create delete order action and reducer
    3. add order delete action to order list

44. Deliver Order(process order details individually as an admin)
    1. create constants, actions and reducers for deliver order
    2. add order deliver action to order details screen

45. Publish to Heroku
    1. Create git repository
    2. Create heroku account
    3. install Heroku CLI
    4. heroku login
    5. heroku apps:create <yourname>amazone
    6. Edit package.json for build script
    10. Create Profile
    12. Create mongodb atlas database
    19. Set database connection in heroku env variables
    20. Commit and push

46. List Users
    1. build api for list users
    2. Create UserListScreen
    3. create order details constants, actions and reducers

47. Delete Users
    1. build api for delete users
    2. create order details constants, actions and reducer
    3. Use action in UserListScreen

48. Edit User
    1. build api for update users
    2. create edit screen UI


49. Implement Seller View
    1. add seller menu
    2. create seller route
    3. define a 'seller' userModel
    4. create form for seller to enter seller data in ProfileScreen
    5. update ProductListScreen to serve seller view, list products for seller
    6. update OrderListScreen to serve seller view, list orders for seller
    7. add Seller to ProductListScreen and DetailsScreen

50. Create Seller Page
    1. create seller page
    2. create seller carousel

51. Add Top Seller Carousel
    1. install react carousel
    2. implement actions and reducers for top sellers
    3. use react carousel with data in Home Screen

52. Force Order Items From One Seller
    1. update addToCart action to buy from one seller at a time per order