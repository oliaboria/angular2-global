import { Response } from '@angular/http';
import { Observable } from 'rxjs';

export interface ResponseErrorHandler {
	(err: Response, caught: Observable<any>): Observable<string>
}
