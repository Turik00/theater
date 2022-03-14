import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first, Observable, Subscription } from 'rxjs';
import { ExternalMoviesService } from 'src/services/external-movies.service';
import { InternalMoviesService } from 'src/services/internal-movies.service';
import { IMoviesSearchResult } from 'src/types';
import { MovieSearchBarComponent } from '../movie-search-bar/movie-search-bar.component';

@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MovieSearchBarComponent) movieSearchBarComponent!: MovieSearchBarComponent;
  public isSearchLocalDb = false;
  public movies$: Observable<IMoviesSearchResult> | null = null;

  private currentlySearchedQuery = '';
  private currentPageNumber = 1;
  private notificationSubscription: Subscription | null = null;
  constructor(private externalMoviesService: ExternalMoviesService, private internalMoviesService: InternalMoviesService) { }
  

  ngAfterViewInit(): void {
    this.notificationSubscription = this.internalMoviesService.movieStatusChanged.subscribe(() => {
      if (this.isSearchLocalDb) {
        this.updatePage();
      }
    });
  }

  public onOptionSelected(ev: string){
    // alway start from presenting movies from page 1
    this.currentPageNumber = 1;
    this.movies$ = null;
    this.movies$ = this.getMovieService().searchMovies(ev);
    this.currentlySearchedQuery = ev;
  }

  public search(){
    this.onOptionSelected(this.movieSearchBarComponent.searchMoviesCtrl.value);
  }

  public changePage(pageNumber: number){
    this.currentPageNumber = pageNumber + 1;
    this.movies$ = null;
    this.movies$ = this.getMovieService().searchMovies(this.currentlySearchedQuery, this.currentPageNumber);
  }

  public onMovieToggleChange(){
    if (this.isSearchLocalDb) {
      this.internalMoviesService.retrievAllLocalMovies();
    }
    this.movieSearchBarComponent.searchMoviesCtrl.setValue('');
    this.search();
  }

  private getMovieService():ExternalMoviesService | InternalMoviesService{
    if (this.isSearchLocalDb) {
      return this.internalMoviesService;
    }
    return this.externalMoviesService;
  }

  private updatePage(){
    this.movies$ = null;
    this.movies$ = this.getMovieService().searchMovies(this.currentlySearchedQuery, this.currentPageNumber);
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription != null) {
      this.notificationSubscription.unsubscribe();
    }
  }

}
