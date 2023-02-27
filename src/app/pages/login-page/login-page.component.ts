import { Component, OnInit } from '@angular/core';
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
