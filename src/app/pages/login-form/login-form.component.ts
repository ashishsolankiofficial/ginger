import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  error: string;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),

  });

  constructor(private authService: AuthService, private router: Router) { }


  goToRegister() {
    this.router.navigate(['login-page/register']);
  }

  login() {
    const val = this.loginForm.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(
        (response) => {
          this.router.navigateByUrl('/home-page');
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
