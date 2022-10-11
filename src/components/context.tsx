import React, { createContext, useReducer, Dispatch, PropsWithChildren } from 'react';
import { reducerMovies, MoviesActions, initialState } from '../reducers/reducer_movies';
import { IListMovies } from '../services/movies';

const MovieContext = createContext<{
    dataMovies: IListMovies;
    dispatch: Dispatch<MoviesActions>;
  }>({
    dataMovies: initialState,
    dispatch: () => null
  });

const MovieProvider: React.FC<PropsWithChildren> = ({ children }) => {    
    const [dataMovies, dispatch] = useReducer(reducerMovies, initialState);
  
    return (
      <MovieContext.Provider value={{ dataMovies, dispatch }}>
        {children}
      </MovieContext.Provider>
    );
  };

export { MovieProvider, MovieContext };