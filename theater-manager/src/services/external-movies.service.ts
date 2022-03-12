import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseBackendUrl } from '../Consts';

@Injectable({
  providedIn: 'root',
})
export class ExternalMoviesService {
  private readonly externalMoviesApi = 'external-movies/';
  private readonly autoCompleteOptionsNumber = 4;

  constructor(private httpClient: HttpClient) {}

  public getAutoCompleteSearchOptions(searchString: string): Observable<string[]> {
    if (searchString == null || searchString === '' || searchString.length < 3) {
      return of([]);
    }
    return this.httpClient
      .get<string[]>(
        `${baseBackendUrl}${this.externalMoviesApi}search-movies-autocomplete/${searchString}/${this.autoCompleteOptionsNumber}`
      );
  }
}
