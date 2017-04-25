import { Injectable  } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from './http.client.service';

import { User } from '../interfaces';
import { TOKEN_KEY } from '../config';

@Injectable()
export class AuthService {
	private userInfo: BehaviorSubject<User> = new BehaviorSubject(<User> {});

	constructor(private http: HttpClient) {}

	login(user: User): Observable<any> {
		return this.http.post('/auth/login', user)
			.map((res: Response) => {
				let resBody = res.json();

				this.userInfo.next(user);
				localStorage.setItem(TOKEN_KEY, resBody.token);

				return resBody;
			})
			.catch((err: Response, caught: Observable<any>) => {
				let error = `Status: ${err.status}, Status text: ${err.statusText}`;

				return Observable.throw(error);
			});
	}

	logout(): void {
		this.userInfo.next({});
		localStorage.removeItem(TOKEN_KEY);
	}

	isAuthenticated(): boolean {
		return !!localStorage.getItem(TOKEN_KEY);
	}

	getUserInfo(): Observable<User> {
		if (!this.isAuthenticated()) {
			this.userInfo.next(JSON.parse(localStorage.getItem(TOKEN_KEY)));
		}

		return this.userInfo.asObservable();
	}
}
