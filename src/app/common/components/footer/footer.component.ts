import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'main-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
	year: number;

	constructor () {
		this.year = new Date().getFullYear();
	}
}
