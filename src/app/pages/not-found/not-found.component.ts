import { Component,
		 ChangeDetectionStrategy,
		 OnInit,
		 ViewEncapsulation } from '@angular/core';

import { BreadcrumbService } from '../../common/services';

@Component({
	selector: 'not-found-page',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './not-found.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

	constructor(private breadcrumbService: BreadcrumbService) {}

	ngOnInit(): void {
		this.breadcrumbService.setCrumb({
			title: '404',
			url: '**'
		});
	}
}
