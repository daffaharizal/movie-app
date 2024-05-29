import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies.component';
import { DetailMovieComponent } from './pages/detail-movie/detail-movie.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: ':id',
    component: DetailMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
