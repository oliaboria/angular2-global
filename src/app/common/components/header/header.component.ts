import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../../services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styleUrls: ['./header.component.scss'],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

	constructor(public authService: AuthService) {}
}
