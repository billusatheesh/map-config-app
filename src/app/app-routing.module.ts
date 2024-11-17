import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadSettingsComponent } from './pages/upload-settings/upload-settings.component';
import { MapSettingsComponent } from './pages/map-settings/map-settings.component';
import { TestSuiteRunComponent } from './pages/test-suite-run/test-suite-run.component';
import { TestResultCompareComponent } from './pages/test-result-compare/test-result-compare.component';
import { MapsettingsRootComponent } from './pages/mapsettings-root/mapsettings-root.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'translator', component: UploadSettingsComponent},
      {path: 'root-map', component: MapsettingsRootComponent},
      {path: 'mapsettings/:mapId', component: MapSettingsComponent},
      {path: 'test-run', component: TestSuiteRunComponent},
      {path: 'result-compare', component: TestResultCompareComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
