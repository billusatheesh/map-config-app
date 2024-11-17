import { Component, OnInit } from '@angular/core';
import { MapsettingsRootService } from '../../services/mapsettings-root.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapsettings-root',
  templateUrl: './mapsettings-root.component.html',
  styleUrl: './mapsettings-root.component.scss'
})
export class MapsettingsRootComponent implements OnInit {

  private gridApi!: GridApi<any>;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'single';

  colDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Map Name', field: 'name' },
  ];
  rowData: any[] = [];

  constructor(
    private mapRootService: MapsettingsRootService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getMapRootData();
  }

  getMapRootData() {
    this.spinner.show();
    this.mapRootService.getAllMapSettings().subscribe({
      next: (success: any) => {
        this.spinner.hide();
        this.rowData = success;
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      }
    });
  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
  }

  onRowClicked(rowEventData: any) {
    let selectedRows: any[] = this.gridApi.getSelectedRows();
    let mapId = selectedRows[0].id;
    this.route.navigate(['/mapsettings', mapId]);
  }

}
