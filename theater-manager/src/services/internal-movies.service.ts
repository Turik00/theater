import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, of } from 'rxjs';
import { IMovie } from 'src/types';
import { baseBackendUrl } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class InternalMoviesService {


  private readonly internalMoviesApi = 'internal-movies/';


  constructor(private httpClient: HttpClient) { }

  public deleteMovie(movieId:number) {
    this.httpClient
    .delete(
      `${baseBackendUrl}${this.internalMoviesApi}delete-movie/${movieId}`
    )
    .pipe(
      first(),
      catchError((val) => {
        console.error(val);
        return of(null);
      })
    ).subscribe();
  }

  public saveMovie(movie: IMovie) {
    this.httpClient
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
    ).subscribe();
  }
}
