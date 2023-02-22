import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  error: string | undefined;
  submitted: boolean = false;

  regForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['login-page'])
  }

  get formControl() {
    return this.regForm.controls;
  }

  register() {

  }


  ngOnInit(): void {
  }

}
