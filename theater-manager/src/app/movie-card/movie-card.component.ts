import { Component, Input, OnInit } from '@angular/core';
import { InternalMoviesService } from 'src/services/internal-movies.service';
import { IMovie } from 'src/types';
import { movieImageUrl } from '../../consts';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: IMovie;

  constructor(private internalMoviesService: InternalMoviesService){}
  ngOnInit(): void {
  }

  public get movieImageUrl() : string {
    return movieImageUrl;
  }

  public deleteMovie(){
    if (this.movie == null) {
      return;
    }
    // observable is set with 'first operator' so no need to unsubscribe
    this.internalMoviesService.deleteMovie(this.movie.movieId).subscribe(() => {
      this.movie.isInLocalDB = false;
      this.internalMoviesService.notifyMovieStatusChange();
    });
  }

  public saveMovie(){
    if (this.movie == null) {
      return;
    }
    // observable is set with 'first operator' so no need to unsubscribe
    this.internalMoviesService.saveMovie(this.movie).subscribe(() => {
      this.movie.isInLocalDB = true;
      this.internalMoviesService.notifyMovieStatusChange();
    });
  }
}
