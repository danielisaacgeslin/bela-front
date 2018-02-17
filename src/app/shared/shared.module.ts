import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyInputComponent } from './currency-input';

const components = [CurrencyInputComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports: components
})
export class SharedModule { }
