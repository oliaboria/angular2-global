import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Course } from '../interfaces';
import { CourseItem } from '../helper-classes';

@Injectable()
export class CoursesService {
	private courses: BehaviorSubject<Course[]> = new BehaviorSubject([]);

	constructor() {
		// This will be removed later. Add course is not implemented for now.
		let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. ' +
					'Praesent libero. Sed cursus ante dapibus diam. ' +
					'Sed nisi. Nulla quis sem at nibh elementum imperdiet. ' +
					'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ' +
					'Mauris massa. Vestibulum lacinia arcu eget nulla. ' +
					'Class aptent taciti sociosqu ad litora torquent per ' +
					'conubia nostra, per inceptos himenaeos.';

		this.createCourse(new CourseItem('Video Course 1', new Date(2017, 3, 1), 30, description, false));
		this.createCourse(new CourseItem('Video Course 2', new Date(2017, 1, 1), 225, description, true));
		this.createCourse(new CourseItem('Video Course 3', new Date(2017, 4, 1), 120, description, true));
		this.createCourse(new CourseItem('Video Course 4', new Date(2017, 11, 1), 15, description, false));
	}

	getCourses(): Observable<Course[]> {
		return this.courses.asObservable();
	}

	createCourse(course: Course): Course {
		let courses = this.courses.getValue();

		courses.push(course);
		this.courses.next(courses);
		return course;
	}

	getCourseById(id: number): Course {
		let course = this.courses.getValue()
 		 	.find((item: Course) => {
				return item.id === id;
			});

		return course;
	}

	updateCourse(id: number, updateFields: {title?: string,
											createDate?: Date,
											duration?: string,
											description?: string}): Course {
		let updatedCourse = this.getCourseById(id);

		Object.assign(updatedCourse, updateFields);
		return updatedCourse;
	}

	removeCourse(id: number): Observable<Course[]> {
		let removedIndex = this.getCourseIndex(id);

		if (removedIndex > -1) {
			this.courses.getValue().splice(removedIndex, 1);
		}

		return this.courses.asObservable();
	}

	private getCourseIndex(id: number): number {
		let course: Course = this.getCourseById(id);

		return this.courses.getValue().indexOf(course);
	}
}
