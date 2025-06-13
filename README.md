# Description

- This is a simple Map app that uses the new Google Places API (Autocomplete and Text search) to achieve this
- Its writeen in Typescript, and it uses Redux with Redux toolkit to handle state management, along side Redux-Observable as the middleware
- For design, we're using Ant Design React Native to make the UI clean and user friendly

<img width="1002" alt="Screenshot 2025-06-13 at 8 07 31 AM" src="https://github.com/user-attachments/assets/942ae1a5-8b09-4c6e-8638-43091d00f3cf" />


# Setup

- obtain a PLACES_API_KEY with [this](https://developers.google.com/maps/documentation/places/web-service/cloud-setup) setup and add it as `EXPO_PUBLIC_PLACES_API_KEY` in your .env.local file. see .env.example

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


# Limitations & Future Enhacements
- Due to time constaints, some UX was left out:
  - Zoom into Region with markers, when the search function finds places to pin on the map
  - displaying error / empty state when searching for results
  - clearing the markers
- In addition, here would we some additional functions for future enhancements:
  - network connectivity banner
  - description card for places (photo, full address, type of place)
  - tags (e.g. Restaurant, Gas Station, etcs) for enhancing the search results
