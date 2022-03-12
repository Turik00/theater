import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import { ExternalMoviesService } from 'src/services/external-movies.service';

@Component({
  selector: 'movie-search-bar',
  templateUrl: './movie-search-bar.component.html',
  styleUrls: ['./movie-search-bar.component.scss']
})
export class MovieSearchBarComponent implements OnInit {

  //TODO: pass the selected to the main: //@Output()optionSelected: EventEmitter<MatAutocompleteSelectedEvent>

  public filteredOptions!: Observable<string[]>;
  public myControl = new FormControl();

  constructor (private externalMoviesService: ExternalMoviesService){}
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.filter(value)),
    );
  }

  private filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.externalMoviesService.getAutoCompleteSearchOptions(filterValue);
  }

}
