import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'dashboard-movies-section',
  templateUrl: './dashboard-movies-section.component.html',
  styleUrls: ['./dashboard-movies-section.component.scss']
})
export class DashboardMoviesSectionComponent implements OnInit {

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngOnInit(): void {
  }

}
