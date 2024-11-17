import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-suite-run',
  templateUrl: './test-suite-run.component.html',
  styleUrl: './test-suite-run.component.scss'
})
export class TestSuiteRunComponent implements OnInit{

  testData: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
