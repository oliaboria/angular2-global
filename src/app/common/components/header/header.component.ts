import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 ViewEncapsulation } from '@angular/core';

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
export class HeaderComponent implements OnInit {
	userName: string;
	isAuthenticated: boolean;

	constructor(private cd: ChangeDetectorRef, public authService: AuthService) {}

	ngOnInit(): void {
		this.authService.getUserInfo().subscribe((user: User) => {
			this.userName = user.name;
			this.isAuthenticated = !!user.password;
			this.cd.markForCheck();
		});
	}
}
