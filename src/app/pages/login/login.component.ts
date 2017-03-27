import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../common/services';
import { User } from '../../common/interfaces';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./login.styles.scss'],
	templateUrl: './login.template.html'
})
export class LoginComponent {
	model: User;

	constructor(public authService: AuthService) {
		this.model = {
			username: '',
			token: ''
		};
	}
}
