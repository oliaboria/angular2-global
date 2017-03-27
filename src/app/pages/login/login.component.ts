import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

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

	constructor(private router: Router, public authService: AuthService) {
		this.model = {
			username: '',
			token: ''
		};
	}

	login(model: User): void {
		this.authService.login(model);
		this.router.navigate(['/']);
	}
}
