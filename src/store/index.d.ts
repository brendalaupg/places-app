declare namespace places {
  interface State {
    searchHistory: string[];
    suggestions: Suggestion[];
    places: Place[];
    loading: boolean;
    error: string | undefined;
  }

  interface DisplayName {
    text: string;
    languageCode: string;
  }

  interface TextSearchResponse {
    places: Place[];
  }

  interface Place {
    id: string;
    formattedAddress: string;
    location: Coordinates;
    displayName: DisplayName;
  }

  // autocomplete payload
  interface Coordinates {
    latitude: number;
    longitude: number;
  }

  interface Circle {
    center: Coordinates;
    radius: number; // meters
  }

  interface LocationRestriction {
    circle: Circle;
  }

  interface AutocompleteRequestPayload {
    input: string;
    locationRestriction: LocationRestriction;
  }

  // autocomplete response
  interface AutocompleteResponse {
    suggestions: Suggestion[];
  }

  type Suggestion =
    | { placePrediction: PlacePrediction }
    | { queryPrediction: QueryPrediction };

  interface PlacePrediction {
    place: string;
    placeId: string;
    text: PredictionText;
    structuredFormat: StructuredFormat;
    types: string[];
  }

  interface QueryPrediction {
    text: PredictionText;
  }

  interface PredictionText {
    text: string;
    matches: Match[];
  }

  interface Match {
    endOffset: number;
    startOffset?: number;
  }
}
