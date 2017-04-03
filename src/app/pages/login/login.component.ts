import { Component,
		 ChangeDetectionStrategy,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../common/services';
import { User } from '../../common/interfaces';
import { LoaderBlockService } from '../../common/components/loader-block';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./login.styles.scss'],
	templateUrl: './login.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
	model: User;

	constructor(private router: Router, private loaderBlockService: LoaderBlockService,
				public  authService: AuthService) {
		this.model = {
			name: '',
			password: ''
		};
	}

	login(model: User): void {
		this.loaderBlockService.display();

		setTimeout(() => {
			this.loaderBlockService.hide();
			this.authService.login(model);
			this.router.navigate(['/']);
		}, 1000);
	}
}
