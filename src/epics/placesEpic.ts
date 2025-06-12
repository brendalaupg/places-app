import { Epic, ofType } from "redux-observable";
import { RootState } from "../root";
import { catchError, debounceTime, filter, map, of, switchMap } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import {
  autocompleteError,
  autocompleteSuccess,
  PlacesActions,
  startAutoComplete,
} from "../store/reducers/placeSlice";

const PLACES_API_BASE_URL =
  "https://places.googleapis.com/v1/places:autocomplete";
const DEBOUNCE_TIME_MS = 500;

export const searchPlacesEpic: Epic<PlacesActions, PlacesActions, RootState> = (
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
        url: PLACES_API_BASE_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.EXPO_PUBLIC_PLACES_API_KEY,
        },
        body: requestBody,
      }).pipe(
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

export const placesEpics = [searchPlacesEpic];
