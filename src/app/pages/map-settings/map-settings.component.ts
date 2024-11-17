import { Component, ElementRef, HostListener, Input, OnInit, input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutputsModel } from '../../models/outputs-model';
import { MapSettingModel } from '../../models/map-setting-model';
import { MapSettingsService } from '../../services/map-settings.service';
import { ColDef, GridApi, GridReadyEvent, IDetailCellRendererParams, ValueCache } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscriber } from 'rxjs';
import { IInputFileModel } from '../../models/IInputFileModel';
import { ActivatedRoute } from '@angular/router';
import { Perform } from '../../http-utils/perform';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrl: './map-settings.component.scss'
})
export class MapSettingsComponent implements OnInit{

  mapId: any;
  private gridApi!: GridApi<any>;
  mapDataForm!: FormGroup;
  inputFileData: IInputFileModel[] = [];
  outputFileData: OutputsModel[] = [];
  isMapFormValid: boolean = false;
  mapSettingArray: MapSettingModel[] = [
    {
      id: 1,
      type: 'Map Setting Name1'
    },
    {
      id: 2,
      type: 'Map Setting Name2'
    },
    {
      id: 3,
      type: 'Map Setting Name3'
    },
    {
      id: 4,
      type: 'Map Setting Name4'
    },
  ];

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
    { headerName: 'ID', field: 'id'},
    { headerName: 'Map Name', field: 'mapName' },
    { headerName: 'Description', field: 'desc' },
    { headerName: 'Input', field: 'input' },
    { headerName: 'Expected Output', field: 'outputs.expectedOutput'}
  ];

  rowData: any = [];

 testData = new Perform<any>(this.spinner);
  
  constructor(
    private fb: FormBuilder,
    private mapSettingService: MapSettingsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.testHttpUtilsClass();
    this.mapDataForm = this.fb.group({
      type: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    });
    this.addInputFiles();
    
    this.mapId = this.router.snapshot.paramMap.get('mapId');
    this.getMapDataByMapId(this.mapId);
  }

  testHttpUtilsClass() {
   this.testData.load(this.mapSettingService.testHttpUtils('Srirama'));
  }

  addInputFiles(): void {
    let outputFile: OutputsModel = {
      output: '',
      regexPattern: ''
    };
    let outPutFileArr: OutputsModel[] = [];
    outPutFileArr.push(outputFile);
    this.outputFileData.push(outputFile);
    let inputFile: IInputFileModel = {
      inputFile: '',
      outputFiles: outPutFileArr
    };
    this.inputFileData.push(inputFile);
  }

  addOutputFiles(inputIndex: number): void {
    let outputFile: OutputsModel = {
      output: '',
      regexPattern: ''
    };
    this.inputFileData.at(inputIndex)?.outputFiles?.push(outputFile);
  }

  removeInputFile(index: number) {
    this.inputFileData.splice(index, 1);
  }

  removeOutputFile(inputIndex: number, outputIndex: number) {
    this.inputFileData.at(inputIndex)?.outputFiles?.splice(outputIndex, 1);
  }

  onMapDataSubmitted() {
    let reqBody: MapSettingModel = this.mapDataForm.value;
    reqBody.inputFiles = this.inputFileData;
    reqBody.inputFiles.forEach((ie, i)=>{
      if(ie.inputFile === undefined || ie.inputFile === ''){
        this.toastr.warning('Input file is mandatory');
        this.isMapFormValid = false;
        return;
      }
      ie.outputFiles?.forEach((oe, j)=>{
        if((oe.output===undefined || oe.output === '') ||
         (oe.regexPattern===undefined || oe.regexPattern === '')){
          this.toastr.warning('please fill all output fields');
          this.isMapFormValid = false;
          return;
        } else {
          this.isMapFormValid = true;
        }
      });
    });
    if(this.isMapFormValid){
      console.log(JSON.stringify(reqBody));
    }
    
  }

  onInputFileChanged(inputEv: any, index: number) {
    let inputFile = inputEv.target.files[0];
    this.convertToBase64String(inputFile).subscribe({
      next: data=>{
        this.inputFileData[index].inputFile = data;
      }, error: err=>{
        console.log("Error onInputFileChanged()",err);
      }
    });
  }
  onOutputFileChanged(outputEv: any, inputIndex: number, outputIndex: number){
    let outputFile = outputEv.target.files[0];
    this.convertToBase64String(outputFile).subscribe({
      next:(data)=>{
        this.inputFileData[inputIndex]?.outputFiles?.map((e, i)=>{
          if(i === outputIndex){
            e.output = data
          }
        });
      }, error: (err) =>{
        console.log("Error onOutputFileChanged()",err);
      }
    });
  }
  regexValueChange(rejexEv:any, inputIndex: number, outputIndex: number){
    const newValue = (rejexEv.target as HTMLInputElement).value;
    this.inputFileData[inputIndex]?.outputFiles?.map((e, i)=>{
      if(i === outputIndex){
        e.regexPattern = newValue
      }
    });
  }
  convertToBase64String(file: File): Observable<any> {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    return observable;
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    }
    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }
  }

  onSearch(eve: any){}

  updateSettings(){
    let inputArray: IInputFileModel[] = [];
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    let inputData: IInputFileModel = {
      inputFile: selectedRows[0].input,
      outputFiles: selectedRows[0].outputs
    }
    inputArray.push(inputData);
    this.inputFileData = inputArray;
    let updateForm = {type: 'test', direction: 'direction', desc: 'Description'};
    this.mapDataForm.setValue(updateForm);
  }
  deleteSettings(){}

  getMapDataByMapId(mapId: number){
    this.spinner.show();
    this.mapSettingService.getMapDataByMapId(mapId).subscribe({
      next: success=>{
        console.log(success);
        this.spinner.hide()
        this.toastr.success('Success');
        this.rowData = success;
      },
      error: err=>{
        this.spinner.hide();
        this.toastr.error('Server Error');
      }
    });
  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
  }

}

