import { Injectable } from '@angular/core';

import { Course } from '../interfaces';
import { CourseItem } from '../helper-classes';

@Injectable()
export class CoursesService {
	private courses: Course[] = [];

	constructor() {
		// This will be removed later. Add course is not implemented for now.
		let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. ' +
					'Praesent libero. Sed cursus ante dapibus diam. ' +
					'Sed nisi. Nulla quis sem at nibh elementum imperdiet. ' +
					'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ' +
					'Mauris massa. Vestibulum lacinia arcu eget nulla. ' +
					'Class aptent taciti sociosqu ad litora torquent per ' +
					'conubia nostra, per inceptos himenaeos.';

		this.createCourse('Video Course 1', new Date(), '1h 28min', description);
		this.createCourse('Video Course 2', new Date(), '2h 15min', description);
		this.createCourse('Video Course 3', new Date(), '45min', description);
		this.createCourse('Video Course 4', new Date(), '1h 10min', description);
	}

	createCourse(title: string, date: Date, duration: string, description: string): void {
		this.courses.push(new CourseItem(title, date, duration, description));
	}

	getCourses(): Course[] {
		return this.courses;
	}
}
