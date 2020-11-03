# Bunny test - Frontend

This is the repository for the frontend project of the Bunny Studios technical test. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), made in React and JS.

<img width="1680" alt="Screen Shot 2020-11-03 at 0 10 20" src="https://user-images.githubusercontent.com/13544410/97951675-00f8a980-1d69-11eb-968c-13a28ca33b7f.png">


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `yarn deploy`

Sends the production version of the app to a bucket in S3. You should have access to the bucket, with it's specific access keys.

## Bunny test software architecture
This project have an architecture based in micro-services, that's the reason the frontend and the backend have been deployed separately. In the next image, you will be able to see how's the structure of the architecture.
![Architecture](https://user-images.githubusercontent.com/13544410/97951639-e1618100-1d68-11eb-804d-0433d8227cb0.png)

## Links of interest
[playground](http://bunny-bucket.s3-website.us-east-2.amazonaws.com/)

[Desktop demo](https://youtu.be/Kk99f0cBoWY)

[Back-end repository](https://github.com/hjcalderon10/bunny-backend)
