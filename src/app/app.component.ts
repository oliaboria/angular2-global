import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./styles/vendors.scss',
		'./styles/index.scss',
		'./app.styles.scss'
	],
	template: require('./app.template.html')
})
export class AppComponent implements OnInit {

	constructor() {}

	public ngOnInit() {}

}
