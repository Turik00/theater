import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {debounceTime, first, startWith, switchMap} from 'rxjs/operators';
import { ExternalMoviesService } from 'src/services/external-movies.service';

@Component({
  selector: 'movie-search-bar',
  templateUrl: './movie-search-bar.component.html',
  styleUrls: ['./movie-search-bar.component.scss']
})
export class MovieSearchBarComponent implements OnInit {
  public filteredOptions!: Observable<string[]>;
  public searchMoviesCtrl = new FormControl();

  @Output() optionSelected = new EventEmitter<string>();
  @Output() optionActivated = new EventEmitter<string>();

  constructor (private externalMoviesService: ExternalMoviesService){}
  ngOnInit() {
    this.filteredOptions = this.searchMoviesCtrl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap(value => this.filter(value)),
    );
  }

  

 

  
  public onOptionActivated(ev: MatAutocompleteActivatedEvent){
    this.optionActivated.emit(ev.option?.value);
  }

  public onOptionSelected(ev: MatAutocompleteSelectedEvent){
    this.optionSelected.emit(ev.option?.value);
  }

  private filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.externalMoviesService.getAutoCompleteSearchOptions(filterValue).pipe(first());
  }

}
