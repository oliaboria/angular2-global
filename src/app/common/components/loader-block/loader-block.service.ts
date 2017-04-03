import { Injectable  } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderBlockService {
	private _show: Subject<boolean> = new Subject();

	get show(): Observable<boolean> {
		return this._show.asObservable();
	}

	display(): void {
		this._show.next(true);
	}

	hide(): void {
		this._show.next(false);
	}
}
