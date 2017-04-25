import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Course } from '../interfaces';
import { CourseItem } from '../helper-classes';
import { HttpClient } from './http.client.service';

@Injectable()
export class CoursesService {
	private courses: BehaviorSubject<Course[]> = new BehaviorSubject([]);

	constructor(private http: HttpClient) {}

	getCourses(start: number, count: number): Observable<Course[]> {
		let params: URLSearchParams = new URLSearchParams();

		params.set('start', start.toString());
		params.set('count', count.toString());

		return this.requestCourses(params);
	}

	findCourses(query: string): Observable<Course[]> {
		let params: URLSearchParams = new URLSearchParams();

		params.set('query', query);

		return this.requestCourses(params);
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

	private requestCourses(params: URLSearchParams): Observable<Course[]> {
		return this.http.get('/courses', { params: params})
			.flatMap((res: Response) => res.json())
			.map((course: any) => {
				return new CourseItem(
						course.name,
						new Date(course.date),
						course.length,
						course.description,
						course.isTopRated,
						course.authors,
						course.id
				);
			})
			.filter((course: Course) => {
				let diff = new Date().getTime() - course.createDate.getTime();

				return (diff / (1000 * 3600 * 24)) < 14;
			})
			.toArray()
			.do((courses: Course[]) => {
				this.courses.next(courses);
			});
	}
}
