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
  coversrc: string = "../../../assets/images/landingimg.png"
  logosrc: string = "../../../assets/images/mainlogo.png"


  constructor() { }

  ngOnInit(): void { }
}
