import { Component, EventEmitter, Input, ViewEncapsulation, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../../../common/interfaces';

@Component({
	selector: 'course',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./course.styles.scss'],
	templateUrl: './course.template.html'
})
export class CourseComponent {
	@Input() item: Course;

	@Output() deleteCourse: EventEmitter<number> = new EventEmitter();

	delete(): void {
		this.deleteCourse.emit(this.item.id);
	}
}
