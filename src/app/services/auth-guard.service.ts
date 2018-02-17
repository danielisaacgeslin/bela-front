import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';

import { StoreService } from './store.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private storeService: StoreService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const canActivate: boolean = this.checkAuth();
    if (!canActivate) this.router.navigate(['login']);
    return canActivate;
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  public checkAuth(): boolean {
    return !!this.storeService.getSync('jwt');
  }
}
