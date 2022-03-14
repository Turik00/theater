import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map, Observable, of, Subject, switchMap } from 'rxjs';
import { IMovie, IMoviesSearchResult } from 'src/types';
import { baseBackendUrl } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class InternalMoviesService {

  public movieStatusChanged = new Subject();

  private readonly internalMoviesApi = 'internal-movies/';
  private readonly pageSize = 20;
  private readonly autoCompletelistLength = 20;
  private allLocalMovies!: Observable<IMovie[]>;

  constructor(private httpClient: HttpClient) {}

  public deleteMovie(movieId: number): Observable<any> {
    return this.httpClient
      .delete(
        `${baseBackendUrl}${this.internalMoviesApi}delete-movie/${movieId}`
      )
      .pipe(
        first(),
        catchError((val) => {
          console.error(val);
          return of(null);
        })
      );
  }

  public saveMovie(movie: IMovie): Observable<any> {
    return this.httpClient
      .post(
        `${baseBackendUrl}${this.internalMoviesApi}add-movie/${movie.movieId}`,
        movie
      )
      .pipe(
        first(),
        catchError((val) => {
          console.error(val);
          return of(null);
        })
      );
  }

  public retrievAllLocalMovies() {
    this.allLocalMovies = this.httpClient
      .get<IMovie[]>(`${baseBackendUrl}${this.internalMoviesApi}`)
      .pipe(
        first(),
        catchError((val) => {
          console.error(val);
          return of([]);
        })
      );
  }

  public searchMovies(
    query: string,
    page = 1
  ): Observable<IMoviesSearchResult> {
    return this.allLocalMovies.pipe(
      map((movies) => {
        let filteredMovies = [...movies];
        if (query != null) {
          filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
        }
        filteredMovies.forEach(movie => {
          movie.isInLocalDB = true;
        });
        return {
          page: page,
          results: filteredMovies.slice(
            this.pageSize * (page - 1),
            this.pageSize * (page - 1) + this.pageSize
          ),
          totalPages: Math.ceil(filteredMovies.length / this.pageSize),
          totalResults: filteredMovies.length,
        } as IMoviesSearchResult;
      })
    );
  }

  public getAutoCompleteSearchOptions(
    searchString: string
  ): Observable<string[]> {
    if (searchString == null || searchString === '') {
      return of([]);
    }
    return this.allLocalMovies.pipe(
      map((movies) => {
        const movieTitles = movies.map((movie) => movie.title);
        const filteredMovieTitles = movieTitles
          .filter((value: string, index: number, self: string[]) => {
            return self.indexOf(value) === index;
          })
          .filter((movie) => movie.toLowerCase().includes(searchString.toLowerCase()));
        return filteredMovieTitles.slice(0,this.autoCompletelistLength);
      })
    );
  }

  public notifyMovieStatusChange(){
    this.movieStatusChanged.next(null);
  }
}
