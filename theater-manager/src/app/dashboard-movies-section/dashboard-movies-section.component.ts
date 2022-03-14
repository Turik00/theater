import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IMovie, IMoviesSearchResult } from 'src/types';

@Component({
  selector: 'dashboard-movies-section',
  templateUrl: './dashboard-movies-section.component.html',
  styleUrls: ['./dashboard-movies-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMoviesSectionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() pageChanged = new EventEmitter<number>();

  public moviesList!: IMovie[];
  public movieListLength = 0;
  public pageSize = 20;
  public showFirstLastButtons = true;

  constructor(){

  }
  @Input() set movies(value: IMoviesSearchResult | null) {
    if (value == null) {
      return;
    }
    this.movieListLength = value.totalResults;
    if (this.paginator != null && value.page == 1) {
      this.paginator.firstPage();
    }
    this.moviesList = value.results;
  }

  ngOnInit(): void {
  }

  public trackByFn(index: number, item: IMovie) {
    return item.movieId;
  }

  public handlePageEvent(event: PageEvent) {
    this.pageChanged.emit(event.pageIndex);
  }

}
