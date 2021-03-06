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

	createCourse(course: Course): Observable<string> {
		return this.http.post('/courses', course)
			.map((res: Response) => res.json());
	}

	getCourseById(id: number): Observable<Course> {
		return this.http.get(`/courses/${id}`)
			.map((res: Response) => res.json())
			.map(this.transformCourse);
	}

	getCourseByIdFromCollection(id: number): Course {
		let course = this.courses.getValue()
 		 	.find((item: Course) => {
				return item.id === id;
			});

		return course;
	}

	updateCourse(id: number, course: Course): Observable<string> {
		return this.http.post(`/courses/${id}`, course)
			.map((res: Response) => res.json());
	}

	removeCourse(id: number): Observable<string> {
		return this.http.delete(`/courses/${id}`)
			.map((res: Response) => res.json());
	}

	getAuthors(): Observable<CourseAuthors[]> {
		return this.http.get('/authors')
			.flatMap((res: Response) => res.json())
			.map((author: any) => {
				return this.transformAuthor(author, false);
			})
			.toArray();
	}

	private getCourseIndex(id: number): number {
		let course: Course = this.getCourseByIdFromCollection(id);

		return this.courses.getValue().indexOf(course);
	}

	private requestCourses(params: URLSearchParams): Observable<Course[]> {
		return this.http.get('/courses', { params: params})
			.flatMap((res: Response) => res.json())
			.map(this.transformCourse)
			.toArray()
			.do((courses: Course[]) => {
				this.courses.next(courses);
			});
	}

	private transformAuthor: (author: any, cheked: boolean) => CourseAuthors =
							 (author: any, cheked: boolean) => {
		author.checked = cheked;
		author.fullName = `${author.firstName} ${author.lastName}`;
		return author;
	}

	private transformCourse: (course: any) => Course = (course: any) => {
		let authors = course.authors.map((author: CourseAuthors) => {
			return this.transformAuthor(author, true);
		});

		return new CourseItem(
				course.name,
				new Date(course.date),
				course.length,
				course.description,
				course.isTopRated,
				authors,
				course.id
		);
	}
}
