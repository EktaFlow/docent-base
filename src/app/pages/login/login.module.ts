import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DoResetComponent } from '../do-reset/do-reset.component';
import { RegisterComponent } from '../register/register.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage, PasswordResetComponent, LoginComponent, DoResetComponent, RegisterComponent]
})
export class LoginPageModule {}
