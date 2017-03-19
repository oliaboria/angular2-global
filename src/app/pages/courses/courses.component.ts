import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../../common/interfaces';
import { CoursesService } from '../../common/services';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./courses.styles.scss'],
	templateUrl: './courses.template.html'
})
export class CoursesComponent implements OnInit {
	items: Course[];

	constructor(private coursesService: CoursesService) {
		this.items = [];
	}

	ngOnInit(): void {
		this.items = this.coursesService.getCourses();
	}

	onDelete(id: number): void {
		console.log('Course id', id);
	}
}
