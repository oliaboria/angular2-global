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
	authSubscription: Subscription;

	constructor(private cd: ChangeDetectorRef, public authService: AuthService) {}

	ngOnInit(): void {
		this.authSubscription = this.authService.getUserInfo().subscribe((user: User) => {
			if (user) {
				this.userName = user.login;
				this.isAuthenticated = !!user.password;
				this.cd.markForCheck();
			}
		});
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
