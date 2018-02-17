import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { StoreService } from '../store.service';
import { environment } from '../../../environments/environment';

export interface Rates {
  [key: string]: number;
}

export class Exchange {
  public base: string = '';
  public date: string = '';
  public rates: Rates = {};

  constructor(args: Exchange) {
    Object.assign(this, args);
  }
}


@Injectable()
export class CurrencyService {
  private readonly baseUrl: string = `${environment.api.root}/${environment.api.currency}`;

  constructor(private httpClient: HttpClient, private storeService: StoreService) { }

  public exchange(base: string, symbols?: string[]): Observable<Exchange> {
    let params: HttpParams = new HttpParams().set('base', base);
    if (symbols) params = params.set('symbols', symbols.join(','));
    return this.httpClient.get<Exchange>(this.baseUrl, { params }).pipe(
      map(data => new Exchange(data))
    );
  }

}
