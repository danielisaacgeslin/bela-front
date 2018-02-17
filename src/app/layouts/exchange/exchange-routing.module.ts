import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ExchangeComponent } from './main';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: ExchangeComponent }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ExchangeRoutingModule { }
