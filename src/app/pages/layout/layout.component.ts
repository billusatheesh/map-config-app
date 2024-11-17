import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  menuItems: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'pie-chart-2',
      link: '/dashboard',
    },
    {
      title: 'Test Suite Config',
      icon: 'cloud-upload-outline',
      expanded: false,
      children: [
        {
          title: 'Translator Settings',
          icon: 'settings-2-outline',
          link: '/translator'
        },
        {
          title: 'Map Settings Root',
          icon: 'settings-outline',
          link: '/root-map',
        },
        // {
        //   title: 'Map Settings',
        //   icon: 'settings-outline',
        //   link: '/mapsettings'
        // },
        {
          title: 'Run Test Suite',
          icon: 'clock-outline',
          link: '/test-run'
        },
        {
          title: 'Test Result Compare',
          icon: 'sync-outline',
          link: '/result-compare'
        }
      ]
    }
  ];

  constructor(
    private router: Router
  ){
  }
  onLogout(){
    this.router.navigate(['/login']);
  }
}
