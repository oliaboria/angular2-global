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

	getCourses(): Course[] {
		return this.courses;
	}

	createCourse(title: string, date: Date, duration: string, description: string): Course {
		let newCourse = new CourseItem(title, date, duration, description);

		this.courses.push(newCourse);
		return newCourse;
	}

	getCourseById(id: number): Course {
		let course: Course;

		this.courses.forEach((item: Course) => {
			if (item.id === id) {
				course = item;
			}
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

	removeCourse(id: number): Course {
		let removedIndex = this.getCourseIndex(id);

		if (removedIndex > -1) {
			this.courses.splice(removedIndex, 1);
		}

		return this.courses[removedIndex];
	}

	private getCourseIndex(id: number): number {
		for (let i = 0; i < this.courses.length; i++) {
			if (this.courses[i].id === id) {
				return i;
			}
		}

		return -1;
	}
}
