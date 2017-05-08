import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Breadcrumb } from '../../interfaces';
import { BreadcrumbService } from '../../services';

@Component({
	selector: 'breadcrumbs',
	templateUrl: 'breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
	crumbSub: Subscription;
	crumbs: Breadcrumb[];

	constructor (protected breadcrumbService: BreadcrumbService,
				 private cd: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.crumbSub = this.breadcrumbService.breadcrumbs
			.subscribe((crumbs: Breadcrumb[]) => {
				this.crumbs = crumbs;
				this.cd.markForCheck();
			});
	}

	ngOnDestroy(): void {
		this.crumbSub.unsubscribe();
	}
}
