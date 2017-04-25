import { Injectable } from '@angular/core';
import { Http,
		 XHRBackend,
		 RequestOptions,
		 Request,
		 RequestOptionsArgs,
		 Response,
		 Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import { BASE_URL, TOKEN_KEY } from '../config';

@Injectable()
export class HttpClient extends Http {

	constructor (backend: XHRBackend, options: RequestOptions) {
		super(backend, options);
	}

	request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
		let token = localStorage.getItem(TOKEN_KEY);

		if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
			url = `${BASE_URL}${url}`;

			if (!options) {
				options = { headers: new Headers() };
			}

			options.headers.set('Authorization', token);
		} else {
			// we have to add the token to the url object
			url.url = `${BASE_URL}${url.url}`;
			url.headers.set('Authorization', token);
		}
		return super.request(url, options);
	}
}
