import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'breadcrumbs',
	templateUrl: 'breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

	constructor () {}
}
