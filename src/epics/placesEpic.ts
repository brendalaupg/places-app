import { Epic } from "redux-observable";

const GOOGLE_PLACES_API_KEY = process.env.PLACES_API_KEY || "";
const PLACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

// Epic for autocomplete search
export const searchPlacesEpic: Epic = (action$) => action$.pipe();

export const placesEpics = [searchPlacesEpic];
