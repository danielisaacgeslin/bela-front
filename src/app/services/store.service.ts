import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { Subject } from 'rxjs/Subject';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

export interface IRawStoreValue<T> {
  key: string;
  storedValue: T;
}

@Injectable()
export class StoreService {
  private stream$: Subject<IRawStoreValue<any>> = new Subject();
  private lastValueCache: { [key: string]: any } = {};

  public set<T>(key: string, storedValue: T): void {
    this.lastValueCache[key] = storedValue;
    this.stream$.next({ key, storedValue });
  }

  public get<T>(key: string): Observable<T> {
    return Observable.merge(this.stream$, this.getLastValueCachedObservable<T>(key)).pipe(
      filter((value: IRawStoreValue<T>) => key === value.key),
      distinctUntilChanged(),
      map((value: IRawStoreValue<T>) => value.storedValue)
    );
  }

  public getSync<T>(key: string): T {
    if (!Object.keys(this.lastValueCache).find(k => k === key)) return null;
    else return this.lastValueCache[key];
  }

  private getLastValueCachedObservable<T>(key: string): Observable<IRawStoreValue<T>> {
    const exists: boolean = !!Object.keys(this.lastValueCache).find(k => k === key);
    if (exists) return Observable.of<IRawStoreValue<T>>({ key, storedValue: this.lastValueCache[key] });
    else return Observable.empty();
  }

}
