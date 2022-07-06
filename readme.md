# DECENT SPACE FRONT END DOCS

## Libraries and technologies: 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Libraries: React-router-dom (for navigate), Redux + Redux-toolkits(for state mangement), Axios (Apis), Antd + SASS(UI),... 

## Coding Convetion:
Tool: ESLINT. More information: [Here](https://viblo.asia/p/hay-su-dung-eslint-cho-du-an-cua-ban-bJzKm07O59N)

## React folders:
`api:` as known as services. Contains functions **POST**, **GET**, **PUT**, **PATCH**, **DELETE** by AXIOS,...

`App.js:` contains App Component

`assets:` contains images, videos, sound files,...

`components:` contains component folders. Each folder contains component files. Each file has used for a certain fuction block

`layouts:` contains recycle UI blocks, such as: Header,Footer,..

`pages:` contains Web's pages, created by `layouts` and `components`

`redux:`

`utils:` utility class that makes it easier to manipulate logic

`Router.js:` base file for r-r-d to manage page navigation

`store.js:` store RootReducer

## Utils
Provide Access Token, **METHODS** to get Token and cookies handle

## Methods To Apis Handle ( /src/api )
### ../BaseRequest.js:
A valid Access token will be written to the Bearer token. Bearer token is the value in the Authorization header of each http request.

Authorization header is a component of JWT (including 3 components: Header(1) , Payload(2) - contains user's descriptions: userID, name,… and Signature(3))

For APIs that require user permissions, the SPA will check in the cookie if there is a JWT payload that will process the request, otherwise it will back to login.

**Handle Api Function :** An async function, use Try Catch Await Function to handle Error during coding process. 

`POST Method:` Post new data to Api. Take 2 parameters: Api address and new Data ( Object Form or other data,such as: images,videos,...) 

`GET Method:` Get data from Api. Take 2 parameters: Api address and params( Usually added to Api)

`PUT Method` and `PATCH Method:` Update data to Api. Take 2 parameters: Api address and new Data.

`DELETE Method:` Delete data. Take 2 parameters: Api and data

**Different from PUT and PATCH method:** 
When using PUT method, you must send a full field data form. If only a certain number of fields are sent, the remaining fields will be deleted ( null ). With PATCH method: Change only those fields that are required to be replaced for the sake of the entire record.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Set up project with Docker

`Step 1:` Clone project at address https://github.com/lethanh231120/code-base-react.git

`Step 2:` Open cmd ( on Window ) or Terminal ( on MacOS ) and access to location, which peer to Dockerfile

`Step 3:` ``` docker build .```

`Step 4:` ``` docker images ``` to get ```${image's ID}```

`Step 5:` ``` docker run -p ${PORT}:${PORT} ${image's ID}```