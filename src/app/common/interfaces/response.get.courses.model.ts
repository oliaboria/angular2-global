import { Course } from './course.model';

export interface ResponseGetCourses {
	courses: Course[];
	totalPages: number;
}
