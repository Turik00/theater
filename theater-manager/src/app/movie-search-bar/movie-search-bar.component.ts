import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {debounceTime, first, startWith, switchMap} from 'rxjs/operators';
import { ExternalMoviesService } from 'src/services/external-movies.service';
import { InternalMoviesService } from 'src/services/internal-movies.service';

@Component({
  selector: 'movie-search-bar',
  templateUrl: './movie-search-bar.component.html',
  styleUrls: ['./movie-search-bar.component.scss']
})
export class MovieSearchBarComponent implements OnInit {
  public filteredOptions!: Observable<string[]>;
  public searchMoviesCtrl = new FormControl();

  @Input() useInternalDb: boolean = false;
  @Output() optionSelected = new EventEmitter<string>();

  constructor (private externalMoviesService: ExternalMoviesService, private internalMoviesService: InternalMoviesService){}
  ngOnInit() {
    this.filteredOptions = this.searchMoviesCtrl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap(value => this.filter(value)),
    );
  }

  public onOptionSelected(ev: MatAutocompleteSelectedEvent){
    this.optionSelected.emit(ev.option?.value);
  }

  private filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    const service = this.useInternalDb ? this.internalMoviesService : this.externalMoviesService;
    return service.getAutoCompleteSearchOptions(filterValue).pipe(first());
  }

}
