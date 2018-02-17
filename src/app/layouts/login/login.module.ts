import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginService } from '../../services/api';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './main';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    LoginRoutingModule
  ],
  providers: [LoginService],
  declarations: [LoginComponent]
})
export class LoginModule { }
