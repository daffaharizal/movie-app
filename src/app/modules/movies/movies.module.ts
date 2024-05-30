import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './pages/movies.component';
import { DetailMovieComponent } from './pages/detail-movie/detail-movie.component';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from 'src/app/shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [MoviesComponent, DetailMovieComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    TranslateModule,
    BreadcrumbComponent,
  ],
})
export class MoviesModule {}
