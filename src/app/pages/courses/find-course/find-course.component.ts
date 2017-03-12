import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'find-course',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./find-course.styles.scss'],
	templateUrl: './find-course.template.html'
})
export class FindCourseComponent {
	query: string;

	constructor () {
		this.query = '';
	}

	findCourse () {
		console.log('Course to find:', this.query);
	}

}
