import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/user/home/home/home.component';
import { LoginComponent } from 'src/components/user/login/login.component';
import { RegisterComponent } from 'src/components/user/register/register.component';
import { AuthGuard } from 'src/helpers/authGuard';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
     // otherwise redirect to home
     { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
