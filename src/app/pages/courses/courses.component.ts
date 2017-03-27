import { Component,
		 ChangeDetectionStrategy,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../../common/interfaces';
import { CoursesService } from '../../common/services';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./courses.styles.scss'],
	templateUrl: './courses.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
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
		this.coursesService.removeCourse(id);
	}
}
