import { Injectable  } from '@angular/core';
import { Response } from '@angular/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from './http.client.service';
import { ResponseErrorHandler, User } from '../interfaces';
import { TOKEN_KEY } from '../config';

@Injectable()
export class AuthService {
	private authSubscription: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(private http: HttpClient) {}

	login(user: User): Observable<any> {
		return this.http.post('/auth/login', user)
			.map((res: Response) => {
				let resBody = res.json();

				localStorage.setItem(TOKEN_KEY, resBody.token);
				this.authSubscription.next(true);

				return resBody;
			})
			.catch(this.handleError);
	}

	logout(): void {
		this.authSubscription.next(false);
		localStorage.removeItem(TOKEN_KEY);
	}

	isAuthenticated(): Observable<boolean> {
		return this.authSubscription.asObservable();
	}

	getUserInfo(): Observable<User | string> {
		return this.http.post('/auth/userinfo', {})
			.map((res: Response) => {
				let resBody = res.json();

				resBody.name = `${resBody.name.first} ${resBody.name.last}`;
				this.authSubscription.next(true);

				return resBody;
			})
			.catch(this.handleError);
	}

	private handleError: ResponseErrorHandler = (err: Response, caught: Observable<any>) => {
		let error = `Status: ${err.status}, Status text: ${err.statusText}`;

		return Observable.throw(error);
	}
}
