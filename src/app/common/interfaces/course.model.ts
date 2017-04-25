import { CourseAuthors } from './course.authors.model';

export interface Course {
	title: string;
	id: number;
	createDate: Date;
	duration: number;
	description: string;
	topRated: boolean;
	authors: CourseAuthors[];
}
