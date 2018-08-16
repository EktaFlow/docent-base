import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginPageModule {}
