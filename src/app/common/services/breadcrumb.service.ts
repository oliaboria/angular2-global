import { Injectable  } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Breadcrumb } from '../interfaces';

const DEFAULT_BREADCRUMB: Breadcrumb = {
	title: 'Courses',
	url: '/courses'
};

@Injectable()
export class BreadcrumbService {
	breadcrumbs: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject([]);

	setCrumb(crumb?: Breadcrumb): void {
		const breadcrumbs = [DEFAULT_BREADCRUMB];

		if (crumb) {
			breadcrumbs.push(crumb);
		}

		this.breadcrumbs.next(breadcrumbs);
	}
}
