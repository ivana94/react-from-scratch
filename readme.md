# Setting up a React Project from Scratch isn't Scary!

In this guide I'll walk you through setting up your own React project from scratch. This means that we're going to start with an empty directory, and by the end of this guide we'll have a functional React application! This guide requires basic knowledge of React, node, and npm.

It's a good idea to learn the basics of how to write a React app from scratch because it will help you better understand how tools like Create React App, Gatsby, and Next all work under the hood. No hate to those tools! They're great, and writing our own app from scratch will make us appreciate them and the work they do for us much more!

## Let's start with the basics

First of all, why is it so much effort just to start a React project? 💀

When starting a React project there's two big problems we need to address:

1. Transformation: change code from one language to another, or change JS from one version of JS to another
    1. React uses JSX, which can't be read by browsers. We will need to use tools to transform our JSX into JS
    2. We'll want to use modern JS. Not all users' browsers can read modern JS, so we'll also need to transform our modern JS into browser-safe JS
2. **Module bundling**: when we write React applications we generally put lots of components into lots of different files. We'll need to compile all of those files into one big file

At minimum the tools we use to start our React application must address these two problems. The good news is that there's lots of very popular tools out there for addressing these problems!

The bad news is we have to learn these tools and how to use them. But such is the life of a developer 😄

The most popular tool to solve the first problem is Babel. Babel is a transpiler, where transpiler is the word for a tool that transforms one language into another, or transforms one version of a programming language into another version of the same language.

The most popular tool developers use to solve the second problem is Webpack. Webpack is a module bundler, which is a fancy way of saying it's a tool that's going to combine all of our React files into one big file. So webpack is (at minimum) going to take all of our `.js` files that contain React code and it's going to combine all of them into one big file.

With all of our React code in one big file, we'll only need to worry about linking one file to our HTML document.

What we'll do next is figure out how to use Webpack to bundle our code and Babel to transform it.

## Getting started 😎

Go ahead a create a brand new directory (it can be a git repository or not), `cd` into it, and initialize an empty `package.json` file:

```bash
mkdir my-project
cd my-project
git init
npm init -y
```

Next let's create `src` and directories. `src` is where we'll put all of our React code and HTML file.

```bash
mkdir src
cd src
touch index.html
```

And in the `index.html` file add the following simple template:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My First React App</title>
    </head>
    <body>
        <div id="”root”"></div>
    </body>
</html>
```

Now let's touch two more files in `src`:

```bash
touch index.js App.js
```

Add the following to `App.js`:

```jsx
import React from "react";
export default function App() {
    return (
        <div>
            <h1> Hello, World! </h1>
        </div>
    );
}
```

Just a simple function component.

In `index.js` we're going to inject our React app into the DOM:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

Now let's go back to our root directory:

```jsx
cd ..
```

And let's start installing some packages:

```bash
npm i react react-dom
npm i webpack webpack-cli webpack-dev-server --save-dev
```

(At the time of writing, this installed React 17 and Webpack 5)

First we install React and `react-dom`. `react-dom` is the package that's going to allow us to inject our React code into the DOM.

Next we install `webpack` and two other `webpack` packages - `webpack-cli` and `webpack-dev-server`.

`webpack-cli` gives us useful command line commands that will allow us to more easily work with webpack.

`webpack-dev-server` provides us with a development server (ie don't use it in production) that will server our webpack app. It provides live reloading, which means we won't have to reload the page every time we make a change to our React code. We can use the recently installed webpack CLI to run the server!

Installing these packages is not enough. What we now need to do is add some configuration. In our root directory, let's go ahead and add a `webpack.config.js` file:

```bash
my-project
  - src
    - App.js
    - index.html
    - index.js
  - package.json
  - package-lock.json
  - webpack.config.js
```

The config file is going to allow us to fully customize what files Webpack should bundle, whether or not it should run our files through something like Babel, and so much more.

All of the config we put in the config file will fall into one of five categories:

1. **Entry**: which file should webpack start with? This is typically going to be the file that injects your React code into the DOM; in other words it'll usually be the file that contains the `ReactDOM.render()` expression
2. **Output**: here we can define the name of the file that contains our compiled code, and which folder it should be emitted to
3. **Mode**: Webpack offers optimizations for different environments (like production, development, or something else)
4. **Loaders**: tells Webpack which file types it should process - by default it only knows `.js` and `.json`
5. **Plugins**: offers optimizations like bundle optimization and asset management

Let's get started writing our webpack config file!

## Getting started with our Webpack config

Inside of `webpack.config.js` let's start with the basics:

```jsx
const path = require("path");
const webpack = require("webpack");

module.exports = {};
```

So the webpack config itself is just an object that's being exported.

### Items #1 and #2: Entry and Output

```jsx
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js",
    },
};
```

So this takes care of the two out of the five items from our above list! 😁

The `entry` property tells webpack where to find the code that injects our React app into the DOM. Webpack starts with that file, and from there it's going to compile the components it's importing, and then it's going to compile all the components that those components import, and it keeps going until all of our components are compiled.

The `out`ut`property is where we're going to spit out the compiled code. In this example, we're going to compile all of our code into a file called`bundle.js`, and this `bundle.js`file will be put into a folder called`dist`.

`bundle.js` and `dist` are commonly use names for these files/folders, but they don't have to be called that. We can call our file and folder whatever we like

We're putting our compiled code into another folder - `dist` in this case - to keep our compiled code separate from the rest of our code.

### Item #3: Mode

```jsx
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js",
    },
    mode: "development",
};
```

That's it! And if you're site is live, you could change it's value to `"production"`

### Side-note: Webpack Dev Server

Next let's go ahead and let our Webpack config know about our dev server. We need to tell the server

1. where to find the HTML file that it needs to server
2. where to find the compiled code

To webpack config, let's add the following:

```jsx
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist/"),
        },
        compress: true,
        hot: true,
    },
};
```

So we're telling the server to serve everything from the `dist` folder; gzip everything; and turn on Webpack's HMR feature ("Hot Module Replacement"). This is going to allow us to write code and see the changes reflected on-screen immediately without a full page reload.

We're going to run the server from the command line (using t`e Webpack CLI we installed), so let's quickly hop over to `package.json`and add a`start`script that's going to turn on the Webpack server whenever we run`npm start`:

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
}
```

So now when we run `npm start` in our terminal, it's going run that `webpack-dev-server` command, which will kick off our Webpack server!

However, if you run that command just yet, it won't work. 🥲

The reason is that Webpack still doesn't know how to handle our JSX. What we need to do next is convert the JSX to JS and modern JS into browser-safe JS, and for that we need Babel.

As a reminder, Babel is our transpiler; it's the tool that's going to convert our JSX into JS, and it's also going to convert our modern JS into browser-safe JS.

### Item #4: Loaders

Let's install some dependencies:

```bash
npm i babel-loader @babel/core  @babel/preset-env @babel/preset-react --save-dev
```

`@babel/core` is going to allow us to programmatically transform our code. This is the core Babel library. It comes with a `transform` method that takes some code and options as arguments, and it will return the transformed code.

`babel-loader` is the package that's going to allow us to connect Babel with Webpack.

`@babel/preset-env` is the package that's going to transpile our modern JS code into browser-safe JS.

`@babel/preset-react` is going to parse and transpile our JSX.

Now that we've installed these packages, let's update our webpack config so that Webpack knows to run the code it's compiling through Babel:

```jsx
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js",
    },
    // inside of "module" is where all of our loaders will go
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist/"),
        },
        compress: true,
        hot: true,
    },
};
```

The `test` property tells webpack what file type it should look out for. So here we're telling webpack to focus on `.js` files.

The `exclude` property tells webpack which files/directories it should ignore. We want to transpile only our React code. The reason for this is that Babel is very slow so we want to be sure we're only transpiling the code that needs transpiling.

The `use` property is where we actually define which loader we want to use. Here the loader we want to use is `babel-loader`, and we're going to be using the rules defined in `@babel/preset-env` and `@babel/preset-react`. `@babel/preset-env` is the package we just installed that's going to transpile modern JS into browser-safe JS, and `@babel/preset-react` is going to transpile our JSX.

So basically:

```jsx
module: {
    rules: [
        {
            // hey webpack, focus on .js files :)
            test: /\.?js$/,
            // but ignore js files in these directories
            exclude: /node_modules/,
            use: {
                // please run these .js files through babel
                loader: "babel-loader",
                options: {
                    // please use the rules defined in this package :)
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                },
            },
        },
    ],
},
```

This configures Babel but doesn't tell Babel to actually do anything. Babel wants us to additionally create a file called `.babelrc` and add the presets to it:

```
my-project
  - src
    - App.js
    - index.html
    - index.js
  - .babelrc
  - package.json
  - package-lock.json
  - webpack.config.js
```

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Now Babel should be good to go.

By the way, we just crossed loaders off our list... this means the only item left to discuss is plugins 🧩

### Item #5: Plugins

Right now if we try to run our webpack dev server with `npm start`, we still won't be able to access our React app.

Currently, webpack is transforming all of our JS files and putting them into a folder called `dist`. But it's not doing anything yet with our HTML document. So while our `index.js` and `App.js` are being transformed and regenerated over in the `dist` folder, our HTML file is sitting alone, untransformed 😥.

Additionally, we haven't actually done anything yet to have our index.html and index.js files to talk to each other. Recall that our index.js file is the file that's injecting our React app into the DOM; it's specifically looking for an element with `id='root'`. But at no point did we tell index.js that it'll find that element inside of our HTML file; at no point did we add a `<script>` to our HTML file pointing to bundle.js (the file our compiled code lives in).

Let's address this - with plugins!

A loader is used to change files in our project; for example, we can use loaders to transform code in a `.js` file.

Plugins, however, can be used to perform tasks outside of just changing the code inside of a file. For example, we could use a plugin optimize certain files like images while compiling them. We're going to use a plugin to generate an HTML file based on our `index.html` file, and put a `<script>` tag linking to our `bundle.js` file for us.

Let's install the plugin:

```bash
npm install html-webpack-plugin --save-dev
```

And let's now add it to our Webpack config:

```jsx
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        compress: true,
        hot: true,
    },
    plugins: [
        // this plugin will generate an HTML file
        // based on our index.html file;
        // will put a script tag in it linking to our index.js file;
        // and will put the new HTML file in our dist folder
        new HtmlWebPackPlugin({
            // here we tell the plugin where to find out HTML file
            template: path.join(__dirname, "src", "index.html"),
            // and here we tell the plugin to put the script tag in the body
            // (as opposed to the head)
            inject: "body",
        }),
    ],
};
```

Now when we run the webpack server, it's going to transform JSX into JS; modern JS into browser-safe JS; and it will generate an HTML file with a link to our bundle.js file.

At this point we should be able to run our project!

## Running our Project 😁

In your terminal run `npm start`, and wait a few seconds while your code compiles. When you see the `webpack compiled successfully` message, head on over to `localhost:8080` and - hopefully 🤞🏼 - you should see your project!

Unfortunately I know things don't always work out so smoothly. All the code for this demo is pasted below. If your code didn't work try comparing your code to mine, and hopefully the problem is just a minor syntax error.

## Completed Code

### fs Structure

```
my-project
  - src
    - App.js
    - index.html
    - index.js
  - .babelrc
  - package.json
  - package-lock.json
  - webpack.config.js
```

### webpack.config.js

```jsx
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        compress: true,
        hot: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            inject: "body",
        }),
    ],
};
```

### .babelrc

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### package.json

```json
{
    "name": "my-project",
    "version": "1.0.0",
    "description": "",
    "main": "",
    "scripts": {
        "start": "webpack-dev-server --mode development"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "react": "^17.0.2",
        "react-dom": "^17.0.2"
    },
    "devDependencies": {
        "@babel/preset-env": "^7.16.4",
        "@babel/preset-react": "^7.16.0",
        "babel-loader": "^8.2.3",
        "html-webpack-plugin": "^5.5.0",
        "webpack": "^5.64.4",
        "webpack-cli": "^4.9.1",
        "webpack-dev-server": "^4.6.0"
    }
}
```

### index.js

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My First React App</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### App.js

```jsx
import React from "react";
export default function App() {
    return (
        <div>
            <h1> Hello, World! </h1>
        </div>
    );
}
```
