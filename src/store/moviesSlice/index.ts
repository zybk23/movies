import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  apiKey,
  IFilterParams,
  IMovieDetails,
  IMovieType,
} from "../../utils/types";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (params?: IFilterParams) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${params?.search}&page=${params?.page}&y=${params?.date}&type=${params?.type}`
    );

    return response.data;
  }
);

export const getMovieByIMDbId = createAsyncThunk(
  "movies/getMovieByIMDbId",
  async (id: string) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
    );

    return response.data;
  }
);

export interface stateType {
  movies: IMovieType[];
  movieDetails: IMovieDetails;
  totalResults: string;
}

export interface IResponse {
  response: string;
  Search: IMovieType[];
  totalResults: string;
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    totalResults: "",
    movieDetails: {},
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<stateType>) => {
    builder.addCase(
      getMovies.fulfilled,
      (state: stateType, action: PayloadAction<IResponse>) => {
        state.movies = action.payload.Search || [];
        state.totalResults = action.payload.totalResults;
      }
    );
    builder.addCase(
      getMovieByIMDbId.fulfilled,
      (state: stateType, action: PayloadAction<IMovieDetails>) => {
        state.movieDetails = action.payload;
      }
    );
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
