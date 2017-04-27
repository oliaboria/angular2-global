import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Course, CourseAuthors } from '../interfaces';
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
											description?: string}): Observable<Course[]> {
		let updatedCourse: Course = this.getCourseById(id),
			updatedIndex: number = this.getCourseIndex(id),
			courses: Course[];

		Object.assign(updatedCourse, updateFields);
		courses = this.courses.getValue();
		courses[updatedIndex] = updatedCourse;
		this.courses.next(courses);

		return this.courses;
	}

	removeCourse(id: number): Observable<string> {
		return this.http.delete(`/courses/${id}`)
			.map((res: Response) => res.json());
	}

	getAuthors(): Observable<CourseAuthors[]> {
		return this.http.get('/authors')
			.flatMap((res: Response) => res.json())
			.map((author: CourseAuthors) => {
				author.checked = false;
				author.fullName = `${author.firstName} ${author.lastName}`;
				return author;
			})
			.toArray();
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
			.toArray()
			.do((courses: Course[]) => {
				this.courses.next(courses);
			});
	}
}
