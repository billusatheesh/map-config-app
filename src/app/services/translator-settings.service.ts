import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { TranslatorSettingModel } from '../models/translator-setting-model';
import { Observable, map, of } from 'rxjs';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TranslatorSettingsService {

  // , 'Access-Control-Allow-Origin': '*'

  baseUrl: string = environment.dev.baseUrl;
  options = { headers: { 'Content-Type': 'application/json' } };

  constructor(
    private httpClient: HttpClient

  ) { }


  saveTranslatorSettings(reqBody: TranslatorSettingModel) {
    return this.httpClient.post(`${this.baseUrl}/mrts/sITranslatorSettingsEntities`, reqBody, this.options);
  }

  getTranslatorSettings(): Observable<TranslatorSettingModel[]> {
    return this.httpClient
      .get<TranslatorSettingModel[]>(`${this.baseUrl}/mrts/sITranslatorSettingsEntities`)
      .pipe(
        map(rawData => {
          const respData: TranslatorSettingModel[] = [];
          let rawJson: TranslatorSettingModel[] = JSON.parse(JSON.stringify(rawData))._embedded.sITranslatorSettingsEntities;
          rawJson.forEach(data => {
            let modelData = new TranslatorSettingModel(data);
            respData.push(modelData);
          });
          return respData;
        })
      )
  }

  updateTranslatorSettings(reqBody: any) {
    return this.httpClient.put(`${this.baseUrl}/mrts/sITranslatorSettingsEntities`, reqBody, this.options);
  }

  deleteTranslatorSetting() {

  }

}
