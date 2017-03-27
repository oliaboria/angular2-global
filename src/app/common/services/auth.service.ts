import { Injectable  } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from '../interfaces';

@Injectable()
export class AuthService {
	private userInfo: BehaviorSubject<User> = new BehaviorSubject(<User> {});

	login(user: User): void {
		this.userInfo.next(user);
		localStorage.setItem('userInfo', JSON.stringify(user));
	}

	logout(): void {
		this.userInfo.next({});
		localStorage.removeItem('userInfo');
	}

	isAuthenticated(): boolean {
		return !!this.userInfo.getValue().password;
	}

	getUserInfo(): Observable<User> {
		if (!this.isAuthenticated()) {
			this.userInfo.next(JSON.parse(localStorage.getItem('userInfo')));
		}

		return this.userInfo.asObservable();
	}
}
