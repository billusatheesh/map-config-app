import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-test-result-compare',
  templateUrl: './test-result-compare.component.html',
  styleUrl: './test-result-compare.component.scss',

})
export class TestResultCompareComponent implements OnInit {

  text1 = "Welcome to Angular diff\nthis is new line";
  text2 = "welcome to angular\nthis is new line";

  // input
  inputOptions = { theme: "vs", language: 'plaintext' };
  // compare, output
  diffOptions = { theme: "vs", language: "plaintext", readOnly: true, renderSideBySide: true };
  originalModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };

  constructor() { }

  ngOnInit(): void {
    this.onCompare();
  }

  onCompare() {
    this.originalModel = Object.assign({}, this.originalModel, { code: this.text1 });
    this.modifiedModel = Object.assign({}, this.originalModel, { code: this.text2 });
    window.scrollTo(0, 0); // scroll the window to top
  }

}
