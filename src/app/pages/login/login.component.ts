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
			login: '',
			password: ''
		};
	}

	login(model: User): void {
		this.loaderBlockService.display();

		this.authService.login(model)
			.subscribe((data: any) => {
				this.loaderBlockService.hide();
				this.router.navigate(['/']);
			}, (error: string) => {
				this.loaderBlockService.hide();
				console.log('error: ', error);
			});
	}
}
