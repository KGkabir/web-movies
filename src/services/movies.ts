import fetch from 'isomorphic-fetch';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

export interface IMovie {
    id: number,
    title: string,
    posterPath: string,
    releaseDate: string,
    backdropPath?: string,
    genreIds?: number[],
    originalLanguage?: string,
    originalTitle?: string,
    overview?: string,
    popularity?: number,
    video?: boolean,
    voteAverage?: number,
    voteCount?: number
}

export interface IListMovies {
    page: number,
    results: IMovie[] | [],
    totalPages: number
}

export async function fetchTokenGuess() {

    const httpGuess = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8f781d70654b5a6f2fa69770d1d115a3';

    return await fetch(
        `${httpGuess}`,
        {method: 'GET', headers: headers}
    ).then( async response => {
        if(response.ok) {
            const data = await response.json();
            const tokenGuess = data.guest_session_id;
            window.sessionStorage.setItem('WEBMOV01TK', tokenGuess);
          } else {
            return Promise.reject();                 
          }
    }).catch(error => {
        return Promise.reject();
    });

}

export async function fetchListMovies(page: number): Promise<IListMovies | any> { 
   
    const http = 'https://api.themoviedb.org/3/movie/popular?api_key=8f781d70654b5a6f2fa69770d1d115a3&language=es-ES';

    return await fetch(
                `${http}&page=${page}`,
                {method: 'GET', headers: headers}
            ).then( async response => {
                if(response.ok) {
                    const data = await response.json();
                    return {
                        page: data.page,
                        results: data.results.map((res: any) => {
                                    return {
                                        id: res.id,
                                        title: res.title,
                                        posterPath: res.poster_path,
                                        releaseDate: res.release_date,
                                        genreIds: res.genre_ids,
                                        originalLanguage: res.original_language,
                                        originalTitle: res.original_title,
                                        overview: res.overview,
                                        popularity: res.popularity,
                                        video: res.video,
                                        voteAverage: res.vote_average,
                                        voteCount: res.vote_count
                                    };
                                }),
                        totalPages: data.total_pages
                    };
                  } else {
                    return Promise.reject();                 
                  }
            }).catch(error => {
                return Promise.reject();
            });

}

export async function fetchMovies(query: string): Promise<IMovie | any> {     
    
    const http = 'https://api.themoviedb.org/3/search/movie?api_key=8f781d70654b5a6f2fa69770d1d115a3&language=es-ES&page=1&include_adult=false';
    
    return fetch(
                `${http}&query=${query}`,
                {method: 'GET', headers: headers}
            ).then( async response => {
                if(response.ok) {
                    const data = await response.json();
                    return {
                        page: data.page,
                        results: data.results.map((res: any) => {
                                    return {
                                        id: res.id,
                                        title: res.title,
                                        posterPath: res.poster_path,
                                        releaseDate: res.release_date,
                                        genreIds: res.genre_ids,
                                        originalLanguage: res.original_language,
                                        originalTitle: res.original_title,
                                        overview: res.overview,
                                        popularity: res.popularity,
                                        video: res.video,
                                        voteAverage: res.vote_average,
                                        voteCount: res.vote_count
                                    };
                                }),
                        totalPages: data.total_pages
                    };
                  } else {
                    return Promise.reject();                 
                  }
            }).catch(error => {
                return Promise.reject();
            });

}

export async function fetchScore(id: number, score: number) { 
        
    const http = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=8f781d70654b5a6f2fa69770d1d115a3&guest_session_id=${window.sessionStorage.WEBMOV01TK}`;
    
    const body = {
        "value": score
    };
    
    return fetch(
        `${http}`,
        {    
            method: 'POST', 
            headers: headers,
            body: JSON.stringify(body)
        }
    ).then( async response => {
        if(response.ok) {
            const data = await response.json();
            return data;
          } else {
            return Promise.reject();                 
          }
    }).catch(error => {
        return Promise.reject();
    });

}

export async function fetchMyListMovies() { 
   
    const http = `https://api.themoviedb.org/3/guest_session/${window.sessionStorage.WEBMOV01TK}/rated/movies?api_key=8f781d70654b5a6f2fa69770d1d115a3&language=en-ES&sort_by=created_at.asc`;

    return await fetch(
                `${http}`,
                {method: 'GET', headers: headers}
            ).then( async response => {
                if(response.ok) {
                    const data = await response.json();
                    return {
                        page: data.page,
                        results: data.results.map((res: any) => {
                                    return {
                                        title: res.title,
                                        posterPath: res.poster_path,
                                        releaseDate: res.release_date,                                        
                                    };
                                }),
                        totalPages: data.total_pages
                    };
                  } else {
                    return Promise.reject();                 
                  }
            }).catch(error => {
                return Promise.reject();
            });

}