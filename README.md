# Brain Bot
## Overview
This project is a React frontend for a functional chatbot that leverages Generative AI services like OpenAI or Anthropic to answer user queries.

## Deployment
1. Create a Vercel account: https://vercel.com/
1. Connect your Vercel account to your GitHub repository.
1. Set up environment variables in Vercel
1. Vercel will automatically build and deploy your project when it detects changes pushed to your main branch.

## Development
1. Clone the repository
1. Install dependencies
    * Make sure to have Node.js installed
    * Run `npm install` to install dependencies
1. Set up environment variables
    * Make a copy of `.env.template` and name as `.env`
    * Input your environment variables
    * Ensure to never commit this file to the GitHub repo
1. Run the development server
    * `npm run start`
    * This will start the development server at `http://localhost:3030` by default.
    * If you need to use another port, set the port in `package.json`
      ```
      "scripts": {
        "start": "PORT=YOUR_NEW_PORT react-scripts start",
      },
      ```


## Create React App

This directory is a brief example of a [Create React App](https://github.com/facebook/create-react-app) site that can be deployed to Vercel with zero configuration.

### Deploy Your Own

Deploy your own Create React App project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/create-react-app&template=create-react-app)

_Live Example: https://create-react-template.vercel.app/_

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.