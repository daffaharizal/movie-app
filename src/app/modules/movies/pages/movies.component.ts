import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  moviesPerPage = 4;
  canLoadMore = true;

  sectionList: string[] = ['All Movies', 'Favorites'];
  selectedSection: string = this.sectionList[0];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.masterService.getData().subscribe({
      next: (res: MovieList) => {
        this.allMoviesList = res?.results;

        if (localStorage.getItem('favorites')) {
          this.favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
          this.allMoviesList = this.allMoviesList.filter((item) => {
            return !this.favoritesMovies.some((fav) => {
              return item.id === fav.id;
            });
          });
          this.selectedSection = 'All Movies';
          this.movieList = [...JSON.parse(localStorage.getItem('favorites'))];
        } else {
          this.movieList = this.allMoviesList;
        }

        this.loadMore();
      },
    });
  }

  changeSection(item: any, index?: number) {
    this.selectedSection = this.sectionList[index];
    if (item == 'All Movies') {
      this.ngOnInit();
    } else {
      this.fetchFavMovies();
    }
  }

  fetchFavMovies() {
    this.movieList = JSON.parse(localStorage.getItem('favorites'));
    this.canLoadMore = false;
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
      return item.id != data.id;
    });
    localStorage.setItem('favorites', JSON.stringify(this.favoritesMovies));

    this.ngOnInit();
  }

  toDetail(data: Movie) {
    this.router.navigate([`/${data.id}`]);
  }

  loadMore() {
    const nextMovies = this.allMoviesList.slice(
      this.movieList.length,
      this.movieList.length + this.moviesPerPage
    );
    this.movieList = [...this.movieList, ...nextMovies];
    this.canLoadMore = true;

    if (this.movieList.length >= this.allMoviesList.length) {
      this.canLoadMore = false;
    }
  }

  truncateOverview(overview: string): string {
    const maxLength = 80;
    if (overview.length > maxLength) {
      return overview.slice(0, maxLength) + '...';
    } else {
      return overview;
    }
  }
}
