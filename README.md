# Description

- This is a simple Map app
- Its writeen in Typescript, and it uses Redux with Redux toolkit to handle state management, along side Redux-Observable as the middleware
- For design, we're using Ant Design React Native to make the UI clean and user friendly
- Uses the new Google Places API (Autocomplete and Text search) to achieve this

# Setup

- obtain a GOOGLE_PLACES_API_KEY with [this](https://developers.google.com/maps/documentation/places/web-service/cloud-setup) setup

# How to Run

## Step 1: Start the Metro Server

- Start Metro by running the following command from the _root_ of the project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Running the Application

- In a _new_ terminal from the _root_ of the project, run the following command:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

Alternatively, you may start the emulator and app on Android Studio directly with the "Run" button

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

Alternatively, you may open Xcode directly, and start the active scheme by clicking on the "Run" button
