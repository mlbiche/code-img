# Code-img

This project is developed as part of Assessment 3 of Advanced Internet Programming subject.

Authors: Zinh Al-Sweedy, Thibaud Malbert

This Web Application is a discussion thread only based on images and reactions.

The front-end is developped using React.js and the RESTful API *(see folder `/API`)* is developped using Express.js.

## Coding conventions

The entire project shoudl respect the following defined coding conventions:

* Indentation is composed by two spaces, as defined by React.js.
* Components `.js` and `.css` files are placed in a same folder specific to the component.
* JavaScript code uses single quote for string while JSX code uses double quotes.<br />
*Ex: `import './Leaderboard.css'` / `<div id="my-id"></div>`*
* Method names do not start with an underscore.
* Folder and file names use Pascal Case. <br />
*Ex: `FrontPageView.js`*
* CSS stylesheet is the last import in `.js` file, seperated by an empty line from other imports.
* JavaScript variable names use Lower Camel Case.<br />
*Ex: `const myVariable = 2;`*
* JavaScript lines end with a semi-colon.
* HTML/CSS `id`s and `class`es names use lower case letters and each composing word is separated with a dash.<br />
*Ex: `<div id="my-id"></div>`*
* Components corresponding to a route have name ending with *View*.<br />
*Ex: `LeaderboardView`*
* The default export for components JavaScript file is the last line of the file, seperated by an empty line from the rest of the code.
* All component JavaScript files must be documented, with at least a header comment on top of the class or function definition.
* Components are defined using a function as often as it is enough.
* All JavaScript functions must have a header comment defining the function purpose, parameters and the return.
* For classes and functions definitions, conditional and loop statements and CSS rules, the opening curly brace is placed at the end of the line, seperated by a space.<br />
*Ex : `function LeaderboardView() {`*

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

**WARNING: Before launching the Web Application, be sure you have started the database and the API *(see `npm run start-db` and `npm run start-api` below)*.**

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### API folder: `npm run start-db`

Launches the MongoDB database.<br />
**WARNING: Always run launch the MondoDB database (`npm run start-db`) in another terminal before starting the API (`npm run start-api`).**<br />
**WARNING: Excute it in ./API folder.**

### API folder: `npm run start-api`

Runs the RESTful API server in the development mode on port 3000.<br />
**WARNING: Always run launch the MondoDB database (`npm run start-db`) in another terminal before starting the API (`npm run start-api`).**<br />
**WARNING: Excute it in ./API folder.**

### API folder: `npm run test-api`

Launches the test runner for the RESTful API server.<br />
**WARNING: Excute it in ./API folder.**

### API folder: `npm run drop-db`

Delete the full MongoDB test database.<br />
**WARNING: Excute it in ./API folder.**

### API folder: `npm run drop-start-db`

Delete the full MongoDB test database and launch a fresh one. *(Combination of `npm run drop-db` and `npm run start-db`)*<br />
**WARNING: Excute it in ./API folder.**