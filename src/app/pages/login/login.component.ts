import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
export class LoginComponent implements OnDestroy {
	model: User;
	loginSub: Subscription;
	unauthorizedMessage: string;

	constructor(private router: Router, private loaderBlockService: LoaderBlockService,
				private cd: ChangeDetectorRef,
				public  authService: AuthService) {
		this.model = {
			login: '',
			password: '',
			name: '',
			fakeToken: '',
			id: null
		};

		this.unauthorizedMessage = '';
	}

	ngOnDestroy(): void {
		this.loginSub && this.loginSub.unsubscribe();
	}

	login(model: User): void {
		this.loaderBlockService.display();

		this.loginSub = this.authService.login(model)
			.subscribe((data: any) => {
				this.loaderBlockService.hide();
				this.router.navigate(['/']);
			}, (error: string) => {
				this.loaderBlockService.hide();
				this.unauthorizedMessage = 'Please check your login or password';
				this.cd.markForCheck();
			});
	}
}
