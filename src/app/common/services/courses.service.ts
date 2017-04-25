import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Course, ResponseGetCourses } from '../interfaces';
import { CourseItem } from '../helper-classes';
import { HttpClient } from './http.client.service';

@Injectable()
export class CoursesService {
	private courses: BehaviorSubject<Course[]>;

	constructor(private http: HttpClient) {
		// This will be removed later. Add course is not implemented for now.
		// let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. ' +
		// 			'Praesent libero. Sed cursus ante dapibus diam. ' +
		// 			'Sed nisi. Nulla quis sem at nibh elementum imperdiet. ' +
		// 			'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ' +
		// 			'Mauris massa. Vestibulum lacinia arcu eget nulla. ' +
		// 			'Class aptent taciti sociosqu ad litora torquent per ' +
		// 			'conubia nostra, per inceptos himenaeos.';

		// let newCourses: Observable<Course> = Observable.of(
		// 	new CourseItem('Video Course 1', new Date(2017, 3, 1), 30, description, false),
		// 	new CourseItem('Video Course 2', new Date(2017, 1, 1), 225, description, true),
		// 	new CourseItem('Video Course 3', new Date(2017, 4, 1), 120, description, true),
		// 	new CourseItem('Video Course 4', new Date(2017, 11, 1), 15, description, false),
		// 	new CourseItem('Video Course 5', new Date(2017, 4, 22), 120, description, true),
		// 	new CourseItem('Video Course 6', new Date(2017, 4, 23), 120, description, true)
		// );

		// newCourses
		// 	.filter((course: Course) => {
		// 		let diff = new Date().getTime() - course.createDate.getTime();

		// 		return (diff / (1000 * 3600 * 24)) < 14;
		// 	})
		// 	.map((course: Course) => {
		// 		course.title = `New ${course.title}`;

		// 		return course;
		// 	})
		// 	.toArray()
		// 	.subscribe((courses: Course[]) => {
		// 		this.courses = new BehaviorSubject(courses);
		// 	});
	}

	getCourses(): Observable<ResponseGetCourses> {
		let params: URLSearchParams = new URLSearchParams();

		params.set('start', '0');
		params.set('count', '25');

		return this.http.get('/courses', { params: params})
			.map((res: Response) => {
				let body = res.json(),
					courses: Course[] = [];

				body.courses.forEach((course) => {
					courses.push(new CourseItem(
						course.name,
						new Date(course.date),
						course.length,
						course.description,
						course.isTopRated,
						course.authors,
						course.id
					));
				});

				return {
					courses: courses,
					totalPages: body.totalPages
				};
			});
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
