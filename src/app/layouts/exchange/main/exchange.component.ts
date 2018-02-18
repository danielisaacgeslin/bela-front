import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { finalize, map, tap, takeUntil, startWith } from 'rxjs/operators';

import { CurrencyService, Exchange } from '../../../services/api';
import { StoreService } from '../../../services/store.service';

export interface IterableRate {
  symbol: string;
  value: number;
}

@Component({
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup = new FormGroup({
    base: new FormControl('USD'),
    symbol: new FormControl('EUR'),
    baseValue: new FormControl(0),
    resultValue: new FormControl({ value: 0, disabled: true }),
  });
  public exchange$: Observable<IterableRate[]> = this.storeService.get('exchange').pipe(
    map((data: Exchange) => Object.keys(data.rates).map(symbol => ({ symbol, value: data.rates[symbol] }))),
  );
  public lastHistoricUpdate: Date;
  private destroy$: Subject<void> = new Subject<void>();
  private exchangeUpdateInterval: number = 10000;

  constructor(private currencyService: CurrencyService, private storeService: StoreService) { }

  public ngOnInit(): void {
    Observable.timer(0, this.exchangeUpdateInterval).pipe(
      takeUntil(this.destroy$),
      tap(() => this.updateExchange())
    )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onSubmit(): void {
    const { base, symbol, baseValue } = this.formGroup.getRawValue();
    this.formGroup.disable();
    this.currencyService.exchange(base, [symbol]).pipe(
      map(data => data.rates[symbol]),
      tap(rate => this.formGroup.controls.resultValue.setValue(this.calculateExchange(baseValue, rate))),
      finalize(() => {
        this.formGroup.enable();
        this.formGroup.controls.resultValue.disable();
      })
    )
      .subscribe();
  }

  private updateExchange(): void {
    const { base } = this.formGroup.getRawValue();
    this.currencyService.exchange(base).pipe(
      tap(data => this.storeService.set('exchange', data)),
      tap(() => this.lastHistoricUpdate = new Date())
    )
      .subscribe();
  }

  private calculateExchange(baseValue: number, rate: number): number {
    if (baseValue === undefined || rate === undefined) return null;
    return baseValue * rate;
  }
}
