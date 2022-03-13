import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchCacheServiceService {
  private readonly cacheDurationInMinutes = 3;

  private cache: {
    [id: string]: {
      expires: Date;
      value: Observable<string[]>;
    };
  } = {};

  constructor() {}

  getValue(key: string): Observable<string[]> | null {
    const item = this.cache[key];
    if (!item) {
      return null;
    }

    if (dayjs(new Date()).isAfter(item.expires)) {
      return null;
    }

    return item.value;
  }

  setValue(value: Observable<string[]>, key: string) {
    const expires = dayjs(new Date())
      .add(this.cacheDurationInMinutes, 'minutes')
      .toDate();
    this.cache[key] = { expires, value };
  }
}

