import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  public isSearchLocalDb = false;
  constructor() { }

  ngOnInit(): void {
  }

}