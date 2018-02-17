import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyService } from '../../services/api';
import { ExchangeRoutingModule } from './exchange-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ExchangeComponent } from './main';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ExchangeRoutingModule
  ],
  providers: [CurrencyService],
  declarations: [ExchangeComponent]
})
export class ExchangeModule { }
