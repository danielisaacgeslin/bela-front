import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

import { StoreService } from '../store.service';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  jwt: string;
}

@Injectable()
export class LoginService {
  private readonly baseUrl: string = `${environment.api.root}/${environment.api.login}`;

  constructor(private httpClient: HttpClient, private storeService: StoreService) { }

  public login(username: string, password: string): Observable<void> {
    return this.httpClient.post<LoginResponse>(this.baseUrl, { username, password }).pipe(
      tap(data => this.storeService.set('jwt', data.jwt)),
      map(() => null)
    );
  }

}
