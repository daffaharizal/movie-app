import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './pages/movies.component';
import { DetailMovieComponent } from './pages/detail-movie/detail-movie.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    MoviesComponent,
    DetailMovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatTooltipModule
  ]
})
export class MoviesModule { }
