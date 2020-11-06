# Burger Builder

## Description
"Burger Builder" is a multi-page application built using React Redux and ReactJS. **This application was created based on a Udemy's [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).**

## Features

#### User Authentication
To order a burger, you need to be logged in to the application. The authentication is created using Firebase Authentication feature.

#### Ordering a burger
You can choose different ingredients to create your own burger. The price of the burger is updated based on the ingredients you've selected. To complete the order, you need to include your email and address. The data is saved to the Firebase Realtime Database.

#### Orders
It's possible to see all the orders placed by the user in the "Orders" tab. The orders are visible only for the currently logged in user.

#### Local storage
Burger's data are stored in the local storage. After refreshing the website, it allows the user to still see the previously selected ingredients.

## Live Demo
[Burger Builder (live preview)](https://cenora6.github.io/burger-builder/)

## Technologies and additional dependencies

| Tool | Description |
| :-------------:|--------------|
| [React](https://www.npmjs.com/package/react/) | JavaScript library for creating user interfaces. |
| [React Router Dom](https://www.npmjs.com/package/react-router-dom/) | DOM bindings for React Router. |
| [Redux](https://www.npmjs.com/package/redux/) | Predictable state container for JavaScript apps. |
| [React Redux](https://www.npmjs.com/package/react-redux/) | Official React bindings for Redux. |
| [Redux Thunk](https://www.npmjs.com/package/redux-thunk/) | Thunk middleware for Redux.  |
| [Axios](https://www.npmjs.com/package/axios/) | Promise based HTTP client for the browser and node.js |
| [Prop-types](https://www.npmjs.com/package/prop-types) | Runtime type checking for React props and similar objects. |
| [Jest](https://www.npmjs.com/package/jest/) | JavaScript testing framework maintained by Facebook, Inc. |
| [Enzyme](https://www.npmjs.com/package/enzyme/) | JavaScript Testing utility for React that makes it easier to test the React Components' output.|
| [React Test Renderer](https://www.npmjs.com/package/react-test-renderer) | Experimental React renderer.|

## Installation
[node.js](http://nodejs.org/download/) is required to use ``npm``.

-  ```git clone https://github.com/Cenora6/burger-builder.git``` to clone the repository
- ```npm install``` to install all dependencies
- ```npm start``` and ```http://localhost:3000/``` in the browser to preview the app
