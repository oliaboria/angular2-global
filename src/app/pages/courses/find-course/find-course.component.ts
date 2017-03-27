import { Component,
		 ChangeDetectionStrategy,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'find-course',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./find-course.styles.scss'],
	templateUrl: './find-course.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindCourseComponent {
	query: string;

	constructor() {
		this.query = '';
	}

	findCourse(): void {
		console.log('Course to find:', this.query);
	}

}
