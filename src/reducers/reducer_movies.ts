
import { IMovie, IListMovies } from '../services/movies';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum Types {
  ListMovies = "fetchListMovies",
  Movies = "fetchMovies",
  MyListMovies = "fetchMyListMovies"
}

type MoviesPayload = {
  [Types.ListMovies]: {
    page: number;
    results: IMovie[] | [];
    totalPages: number;
  };
  [Types.Movies]: {
    page: number;
    results: IMovie[] | [];
    totalPages: number;
  };
  [Types.MyListMovies]: {
    page: number;
    results: IMovie[] | [];
    totalPages: number;
  };
};

export type MoviesActions = ActionMap<MoviesPayload>[keyof ActionMap<
  MoviesPayload
>];

export const initialState = {page: 0, results: [] as any, totalPages: 0};

export const reducerMovies = (state: IListMovies, action: MoviesActions) => {
  switch (action.type) {
    case Types.ListMovies:
      return { ...state, page: action.payload.page, totalPages: action.payload.totalPages, results: action.payload.results};      
    case Types.Movies:
      return { ...state, page: action.payload.page, totalPages: action.payload.totalPages, results: action.payload.results};
    case Types.MyListMovies:
        return { ...state, page: action.payload.page, totalPages: action.payload.totalPages, results: action.payload.results};
    default:
      return state;
  }
}