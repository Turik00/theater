import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'movie-search-bar',
  templateUrl: './movie-search-bar.component.html',
  styleUrls: ['./movie-search-bar.component.scss']
})
export class MovieSearchBarComponent implements OnInit {

  public options: string[] = ['One', 'Two', 'Three'];
  public filteredOptions!: Observable<string[]>;
  public myControl = new FormControl();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
