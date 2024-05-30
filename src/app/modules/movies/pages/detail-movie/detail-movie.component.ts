import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailMovieList } from 'src/app/core/models/detail-movie.model';
import { MasterService } from 'src/app/core/services/master.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
})
export class DetailMovieComponent {
  // create services variable
  private masterService = inject(MasterService);
  private route = inject(ActivatedRoute);

  id: string;
  data: DetailMovieList;

  constructor() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.masterService.movieDetail(this.id).subscribe({
      next: (res: DetailMovieList) => {
        this.data = res;
      },
    });
  }

  toHomepage(link: string): void {
    window.location.href = link;
  }
}
