import { Injectable  } from '@angular/core';

import { User } from '../interfaces';

@Injectable()
export class AuthService {

	login(user: User): void {
		localStorage.setItem('username', user.username);
		localStorage.setItem('token', user.token);
	}

	logout(): void {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
	}

	isAuthenticated(): boolean {
		return !!localStorage.getItem('token');
	}

	getUserInfo(): string {
		return localStorage.getItem('username');
	}
}
