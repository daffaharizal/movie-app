import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieList } from 'src/app/core/models/movie.model';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  private masterService = inject(MasterService);
  private router = inject(Router);

  allMoviesList: Movie[] = [];
  movieList: Movie[] = [];
  favoritesMovies: Movie[] = [];

  ngOnInit() {
    this.masterService.getData().subscribe({
      next: (res: MovieList) => {
        this.allMoviesList = res?.results;
        
        if(localStorage.getItem('favorites')) {
          this.favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
          this.allMoviesList = this.allMoviesList.filter((item) => {
            return !this.favoritesMovies.some((fav) => {
              return item.id === fav.id;
            });
          });

          this.movieList = [
            ...JSON.parse(localStorage.getItem('favorites')),
            ...this.allMoviesList
          ]
        } else {
          this.movieList = this.allMoviesList;
        }
      },
    });
  }

  isInFavorites(data: Movie): boolean {
    return this.favoritesMovies.some((fav: any) => fav.id === data.id);
  }

  addToFavorites(data: Movie) {
    this.favoritesMovies.unshift(data);
    localStorage.setItem('favorites', JSON.stringify(this.favoritesMovies));

    this.ngOnInit();
  }

  deleteFav(data: Movie) {
    this.favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
    this.favoritesMovies = this.favoritesMovies.filter((item: any) => {
      return item.id != data.id
    });
    localStorage.setItem('favorites', JSON.stringify(this.favoritesMovies));

    this.ngOnInit();
  }

  toDetail(data: Movie) {
    this.router.navigate([`/${data.id}`]);
  }
}
