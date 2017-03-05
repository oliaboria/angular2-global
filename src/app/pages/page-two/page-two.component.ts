import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'page-two',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./page-two.styles.scss'],
	templateUrl: './page-two.template.html'
})
export class PageTwoComponent implements OnInit, OnDestroy {
	constructor() {
		console.log('Page two constructor');
	}

	public ngOnInit() {
		console.log('Page two init');
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
