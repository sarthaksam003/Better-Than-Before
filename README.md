<h1 align="center">
  <br>
  <a href="#"><img src="./public/b4bfavicon.png" alt="B4B" width="200"></a>
  <br>
      <br>
Better Than Before - Workout Tracker App
  <br>
</h1>
<p align="center">
  <a href="#Introduction">Introduction</a> •
  <a href="#Key-features">Key features</a> •
  <a href="#Desktop-View-of-the-App">Desktop View of the App</a> •
  <a href="#Mobile-View-of-the-App">Mobile View of the App</a> •
  <a href="#Technologies-used-in-this-project">Technologies used in this project</a> •
  <a href="#Deployed-version-of-project">Deployed version of project</a> •
  <a href="#Getting-Started-with-Create-React-App">Getting started</a> •
</p>

## Introduction

As I was learning how to work in ReactJS and about how to use state management systems in React to manage states of state variables, I decided to create this project as a practice to reinforce all the concepts used to create a Redux store in a React app and apply here.

In process of developing this project, I learned following things:

- How Redux works
- Using the Redux toolkit
- Creating a redux store and granting subscription to the various components in the app
- Creating slices in a store and providing them to components to use state variables and functions that operate on those state variables
- Working with APIs to fetch, retrieve and post data
- Material UI for React
- Responsive layouts with flex and grid

# Key features

- A fully responsive webapp to track gym/home workouts using ExerciseDB API.
- The app uses Firebase Realtime Databases to store and retrieve data entered by users.
- Users can browse a large collection of exercises categorized by target muscles provided by ExerciseDB API.
- Users can log info about their exercises, repetitions performed, sets performed on an exercise and even weights lifted in each set.
- The app allows users to save workouts and retrieve them by date from firebase to track progress.

# Desktop View of the App

<img src = "./public/desktop-view.gif" alt="desktop-view"/>

# Mobile View of the App

<img src = "./public/mob-view.gif" alt="mobile-view" style="width:20rem;"/>

# Technologies used in this project

- <a href="https://www.w3schools.com/react/">React</a>
- <a href="https://www.w3schools.com/js/">JavaScript</a>
- <a href="https://www.w3schools.com/html/">HTML</a>
- <a href="https://www.w3schools.com/css/">CSS</a>
- <a href="https://redux.js.org/">Redux</a>
- <a href="https://mui.com/">Material UI</a>
- <a href="https://www.exercisedb.io/">ExerciseDb API</a>
- <a href="https://www.npmjs.com/package/react-multi-carousel">React multi carousel</a>
- <a href="https://day.js.org/">DayJS</a>

# Deployed version of the project

This project is deployed <a href="https://better-than-before.netlify.app/">here</a> using Netlify.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
