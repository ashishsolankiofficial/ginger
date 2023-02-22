import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  error: string | undefined;
  submitted: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }


  goToRegister() {
    this.router.navigate(['login-page/register']);
  }

  get formControl() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let val = this.loginForm.value
      this.authService.login(val.email, val.password).subscribe(
        (response) => {
          this.router.navigateByUrl('');
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }




  ngOnInit(): void {
  }

}
