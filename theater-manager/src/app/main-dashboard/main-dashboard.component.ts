import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first, Observable, Subscription } from 'rxjs';
import { ExternalMoviesService } from 'src/services/external-movies.service';
import { IMoviesSearchResult } from 'src/types';
import { MovieSearchBarComponent } from '../movie-search-bar/movie-search-bar.component';

@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements AfterViewInit {

  @ViewChild(MovieSearchBarComponent) movieSearchBarComponent!: MovieSearchBarComponent;
  public isSearchLocalDb = false;
  public movies$: Observable<IMoviesSearchResult> | null = null;

  
  private pageIndex: number = 1;
  private activeSearchQuery = '';
  constructor(private externalMoviesService: ExternalMoviesService) { }
  

  ngAfterViewInit(): void {
    //this.movieSearchBarComponent.searchMoviesCtrl.setValue(ev.option?.value);
  }

  public onOptionActivated(ev: string){
    this.activeSearchQuery = ev;
  }

  public onOptionSelected(ev: string){
    this.movies$ = this.externalMoviesService.searchMovies(ev, this.pageIndex);
  }

  public search(){
    this.onOptionSelected(this.movieSearchBarComponent.searchMoviesCtrl.value);
  }

}
