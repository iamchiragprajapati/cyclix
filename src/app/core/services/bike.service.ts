import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }

  getBikeTypeList(): Observable<any> {
    return this.http.get(API_ROUTES.bikeTypeApi);
  }

  getBikeBrandList(): Observable<any> {
    return this.http.get(API_ROUTES.bikeBrandApi);
  }

  postBike(params: any): Observable<any> {
    return this.http.post(API_ROUTES.cyclixSubmitApi, params)
  }
}
