import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MapSettingsService } from '../../services/map-settings.service';
import { Perform } from '../../http-utils/perform';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{



  testData = new Perform<any>(this.spinner);
  constructor(private spinner: NgxSpinnerService, private mapDataService: MapSettingsService) {}


  ngOnInit(): void {

    this.testData.load(this.mapDataService.testHttpUtils('Srirama'));
    
  }



}
