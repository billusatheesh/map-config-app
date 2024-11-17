import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbStepperModule, NbThemeModule, NbTreeGridModule } from '@nebular/theme';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadSettingsComponent } from './pages/upload-settings/upload-settings.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapSettingsComponent } from './pages/map-settings/map-settings.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestSuiteRunComponent } from './pages/test-suite-run/test-suite-run.component';
import { TestResultCompareComponent } from './pages/test-result-compare/test-result-compare.component';
import { AgGridModule } from 'ag-grid-angular';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MapsettingsRootComponent } from './pages/mapsettings-root/mapsettings-root.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    UploadSettingsComponent,
    MapSettingsComponent,
    TestSuiteRunComponent,
    TestResultCompareComponent,
    MapsettingsRootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbMenuModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbStepperModule,
    NbInputModule,
    NbTreeGridModule,
    AgGridModule,
    MonacoEditorModule.forRoot(),
    NbAlertModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbSelectModule,
    NbSearchModule,
    NbListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
