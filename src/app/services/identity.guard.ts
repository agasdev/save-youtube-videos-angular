import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable()
export class IdentityGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const identity = this._userService.getIdentity();

    if (identity) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
