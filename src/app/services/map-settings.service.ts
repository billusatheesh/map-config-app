import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapSettingModel } from '../models/map-setting-model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MapSettingsService {

  baseUrl: string = environment.dev.baseUrl;

  options = { headers: { 'Content-Type': 'application/json' } };
  constructor(
    private http: HttpClient
  ) { }

  uploadMapSettings(reqBody: MapSettingModel, mapId: number){
    return this.http.post(`${this.baseUrl}/mrts/api/v1/map-regression-tests/${mapId}/map-test/`, reqBody, this.options);
  }

  getAllMapSettings(){
    return this.http.get(`${this.baseUrl}/mrts/api/v1/map-regression-tests`, this.options);
  }

  getMapDataByMapId(mapId: number) {
    return this.http.get(`${this.baseUrl}/mrts/api/v1/map-regression-tests/${mapId}/map-tests`, this.options);
  }

  testHttpUtils(name: string) {
    return this.http.get('http://localhost:8081/user?userName='+name);
  }

}
