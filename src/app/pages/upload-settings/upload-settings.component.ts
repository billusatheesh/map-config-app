import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { TranslatorSettingsService } from '../../services/translator-settings.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatorSettingModel } from '../../models/translator-setting-model';

@Component({
  selector: 'app-upload-settings',
  templateUrl: './upload-settings.component.html',
  styleUrl: './upload-settings.component.scss'
})
export class UploadSettingsComponent implements OnInit {

  translatorForm!: FormGroup;

  private gridApi!: GridApi<any>;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';

  colDefs: ColDef[] = [
    {
      headerName: '',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 80,
      resizable: true
    },
    { headerName: 'Translator', field: 'name', editable: true },
    { headerName: 'Host', field: 'host', editable: true },
    { headerName: 'Login', field: 'login', editable: true },
    { headerName: 'Password', field: 'password', editable: true },
  ];
  rowData = [];

  constructor(
    private fb: FormBuilder,
    private translatorService: TranslatorSettingsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.getAllTranslatorSettings();
    this.translatorForm = this.fb.group({
      name: ['', Validators.required],
      host: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  updateSettings() {
    let selectedRows: TranslatorSettingModel[] = this.gridApi.getSelectedRows();
    if (selectedRows.length < 1) {
      this.toastr.warning('You are not modifying data');
      return;
    }
    console.log(selectedRows);
    this.spinner.show();
    this.translatorService.updateTranslatorSettings(selectedRows[0]).subscribe({
      next: (success): void=>{
        this.getAllTranslatorSettings();
        this.spinner.hide();
        this.toastr.success('Data Updated');
      },
      error: err=>{
        this.spinner.hide();
        this.toastr.error('Server Error');
      }
    });
  }

  deleteSettings() {

  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
  }

  getAllTranslatorSettings() {
    this.spinner.show();
    this.translatorService.getTranslatorSettings().subscribe({
      next: (success: any): void => {
        this.spinner.hide();
        console.log('Get API Resp', success);
        this.rowData = success;
        this.toastr.success('Success');
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error('Server Error');
      }
    });
  }


  onTranslatorSubmit() {
    this.spinner.show();
    let reqBody = this.translatorForm.value;
    console.log(reqBody);
    this.translatorService.saveTranslatorSettings(reqBody).subscribe({
      next: success => {
        this.translatorForm.reset();
        this.spinner.hide();
        this.getAllTranslatorSettings();
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error('Server Error');
      }
    });
  }
}


