import { Component,
		 ChangeDetectionStrategy,
		 ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'not-found-page',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './not-found.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
