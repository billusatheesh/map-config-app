import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsettingsRootService {

  baseUrl: string = environment.dev.baseUrl;
  options = { headers: { 'Content-Type': 'application/json' } };

  constructor(
    private http: HttpClient
  ) { }

  getAllMapSettings(){
    return this.http.get('http://sreesoft.synology.me:19080/mrts/api/v1/map-regression-tests/');
  }

}
