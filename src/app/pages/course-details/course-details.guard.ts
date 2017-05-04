import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseDetailsGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
		const param = routeSnapshot.params['id'] || routeSnapshot.url[1].path;

		console.log('apram', param)

		if (param === 'new' || !isNaN(+param)) {
			return true;
		}

		this.router.navigateByUrl('404', { skipLocationChange: true })
		return false;
	}
}
