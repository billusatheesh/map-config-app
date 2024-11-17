import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ){
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onLogin(){
    if(this.loginForm.invalid){
      this.loginForm.invalid;
      return;
    }
    this.router.navigate(['/dashboard']);
  }
}
