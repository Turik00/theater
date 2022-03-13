import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IMovie, IMoviesSearchResult } from 'src/types';

@Component({
  selector: 'dashboard-movies-section',
  templateUrl: './dashboard-movies-section.component.html',
  styleUrls: ['./dashboard-movies-section.component.scss']
})
export class DashboardMoviesSectionComponent implements OnInit {


  @Input() set movies(value: IMoviesSearchResult | null) {
    if (value == null) {
      return;
    }
    this.length = value.totalResults;
    this.pageIndex = value.page;
    this.moviesList = value.results;
  }

  public moviesList!: IMovie[];
  public length = 500;
  public pageSize = 20;
  public pageIndex = 0;
  public showFirstLastButtons = true;

  ngOnInit(): void {
  }

  public trackByFn(index: number, item: IMovie) {
    return item.movieId;
  }

  public handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

}
