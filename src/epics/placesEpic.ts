import { Epic, ofType } from "redux-observable";
import { RootState } from "../root";
import {
  catchError,
  debounceTime,
  filter,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import {
  autocompleteError,
  autocompleteSuccess,
  PlacesActions,
  searchPlaceError,
  searchPlaceSuccess,
  startAutoComplete,
  startSearchPlace,
} from "../store/reducers/placeSlice";

const DEBOUNCE_TIME_MS: number = 500;

const ROUTES = {
  autocomplete: "https://places.googleapis.com/v1/places:autocomplete",
  searchText: "https://places.googleapis.com/v1/places:searchText",
};

export const autocompleteEpic: Epic<PlacesActions, PlacesActions, RootState> = (
  action$
) =>
  action$.pipe(
    ofType(startAutoComplete.type),
    filter((action) => action.payload.input.length > 1),
    debounceTime(DEBOUNCE_TIME_MS),
    switchMap((action) => {
      const { input, locationRestriction } = action.payload;

      // Prepare the request body
      const requestBody: places.AutocompleteRequestPayload = {
        input,
        locationRestriction,
      };

      return ajax<places.AutocompleteResponse>({
        url: ROUTES.autocomplete,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.EXPO_PUBLIC_PLACES_API_KEY,
        },
        body: requestBody,
      }).pipe(
        // Debugging
        // tap((response) =>
        //   console.log(
        //     "Autocomplete Response:",
        //     JSON.stringify(response.response, null, 2)
        //   )
        // ),
        map((response: AjaxResponse<places.AutocompleteResponse>) =>
          autocompleteSuccess(response.response)
        ),
        catchError((error: any) =>
          of(
            autocompleteError(
              error?.response?.error?.message ||
                error?.message ||
                "Failed to fetch autocomplete suggestions"
            )
          )
        )
      );
    })
  );

export const searchTextEpic: Epic<PlacesActions, PlacesActions, RootState> = (
  action$
) =>
  action$.pipe(
    ofType(startSearchPlace.type),
    switchMap((action) => {
      console.log("test here");
      return ajax({
        url: ROUTES.searchText,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.EXPO_PUBLIC_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "places.attributions,places.id,places.displayName,places.formattedAddress,places.location",
        },
        body: {
          textQuery: action.payload,
        },
      }).pipe(
        tap((response) =>
          console.log(
            "Search Results:",
            JSON.stringify(response.response, null, 2)
          )
        ),
        map((response: AjaxResponse<places.TextSearchResponse>) =>
          searchPlaceSuccess(response.response.places)
        ),
        catchError((error: any) =>
          of(
            searchPlaceError(
              error?.response?.error?.message ||
                error?.message ||
                "Failed to fetch text search"
            )
          )
        )
      );
    })
  );

export const placesEpics = [autocompleteEpic, searchTextEpic];
