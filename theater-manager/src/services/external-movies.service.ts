import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { baseBackendUrl } from '../consts';
import { IMoviesSearchResult } from 'src/types';
import { MovieSearchCacheServiceService } from './movie-search-cache-service.service';

@Injectable({
  providedIn: 'root',
})
export class ExternalMoviesService {
  private readonly externalMoviesApi = 'external-movies/';
  private readonly autoCompleteOptionsNumber = 4;
  private readonly defaultMoviesSearchResult: IMoviesSearchResult = {
    page: 0,
    results: [],
    totalPages: 0,
    totalResults: 0,
  };
  constructor(
    private httpClient: HttpClient,
    private movieSearchCacheServiceService: MovieSearchCacheServiceService
  ) {}

  public getAutoCompleteSearchOptions(
    searchString: string
  ): Observable<string[]> {
    if (searchString == null || searchString === '') {
      return of([]);
    }
    let searchOptions$ =
      this.movieSearchCacheServiceService.getValue(searchString);

    if (!searchOptions$) {
      searchOptions$ = this.httpClient
        .get<string[]>(
          `${baseBackendUrl}${this.externalMoviesApi}search-movies-autocomplete/${searchString}/${this.autoCompleteOptionsNumber}`
        )
        .pipe(
          shareReplay(1),
          catchError((val) => {
            console.error(val);
            return of([]);
          })
        );
      this.movieSearchCacheServiceService.setValue(
        searchOptions$,
        searchString
      );
    }

    return searchOptions$;
  }

  public searchMovies(
    query: string,
    page = 1
  ): Observable<IMoviesSearchResult> {
    if (query == null || query === '') {
      return of(this.defaultMoviesSearchResult);
    }
    return this.httpClient
      .get<IMoviesSearchResult>(
        `${baseBackendUrl}${this.externalMoviesApi}search-movies/${query}/${page}`
      )
      .pipe(
        catchError((val) => {
          console.error(val);
          return of(this.defaultMoviesSearchResult);
        })
      );
  }

}
