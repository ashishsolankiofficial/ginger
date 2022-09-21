import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  error: string;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    const val = this.loginForm.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(
        (data) => {
          this.router.navigateByUrl('/home-page');
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
}
