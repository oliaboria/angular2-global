import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from '../interfaces';

@Injectable()
export class AuthService {
	private userInfo: Subject<User> = new Subject<User>();
	private authenticated: Subject<boolean> = new Subject<boolean>();

	login(user: User): void {
		this.userInfo.next(user);
		this.authenticated.next(true);
		localStorage.setItem('userInfo', JSON.stringify(user));
	}

	logout(): void {
		this.userInfo.next({});
		this.authenticated.next(false);
		localStorage.removeItem('userInfo');
	}

	isAuthenticated(): Observable<boolean> {
		return this.authenticated.asObservable();
	}

	getUserInfo(): Observable<User> {
		return this.userInfo.asObservable();
	}
}
