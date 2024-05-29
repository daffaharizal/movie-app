import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private http: HttpClient
  ) { }

  apiKey = 'f387d28c9e6949335db7683276427b45';

  getData() {
    return this.http.get(`${environment.API_URL}/3/movie/top_rated?api_key=${this.apiKey}`)
  }

  movieDetail(id: string){
    return this.http.get(`${environment.API_URL}/3/movie/${id}?api_key=${this.apiKey}`)
  }
}
