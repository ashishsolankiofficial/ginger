import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';

const routes: Routes = [
  {
    path: 'login-page', component: LoginPageComponent,
    children: [
      {
        path: '',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      }]
  },
  { path: 'home-page', component: HomePageComponent },
  { path: '**', redirectTo: 'home-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
