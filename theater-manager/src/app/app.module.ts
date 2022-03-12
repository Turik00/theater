import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieSearchBarComponent } from './movie-search-bar/movie-search-bar.component';
import { DashboardMoviesSectionComponent } from './dashboard-movies-section/dashboard-movies-section.component';

@NgModule({
  declarations: [
    MainDashboardComponent,
    MovieCardComponent,
    MovieSearchBarComponent,
    DashboardMoviesSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [MainDashboardComponent]
})
export class AppModule { }
