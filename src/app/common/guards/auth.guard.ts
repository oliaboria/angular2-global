import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TOKEN_KEY } from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
		if (localStorage.getItem(TOKEN_KEY)) {
			return true;
		}

		this.router.navigateByUrl('login');
		return false;
	}
}
