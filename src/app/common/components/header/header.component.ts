import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services';
import { User } from '../../interfaces';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styleUrls: ['./header.component.scss'],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
	userName: string;
	isAuthenticated: boolean;

	userInfoSubscription: Subscription;
	authSubscription: Subscription;

	constructor(private cd: ChangeDetectorRef, public authService: AuthService) {}

	ngOnInit(): void {
		this.userInfoSubscription = this.authService.getUserInfo()
			.subscribe((user: User) => {
				this.userName = user.name;
				this.cd.markForCheck();
			});

		this.authSubscription = this.authService.isAuthenticated()
			.subscribe((isAuth: boolean) => {
				this.isAuthenticated = isAuth;
				this.cd.markForCheck();
			});
	}

	ngOnDestroy(): void {
		this.userInfoSubscription.unsubscribe();
		this.authSubscription.unsubscribe();
	}
}
