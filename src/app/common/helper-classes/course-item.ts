import { Course, CourseAuthors } from '../interfaces';

export class CourseItem implements Course {
	title: string;
	id: number;
	createDate: Date;
	duration: number;
	description: string;
	topRated: boolean;
	authors: CourseAuthors[];

	constructor(title: string,
				createDate: Date,
				duration: number,
				description: string,
				topRated: boolean,
				authors: CourseAuthors[],
				id?: number) {
		this.title = title;
		this.createDate = createDate;
		this.duration = duration;
		this.description = description;
		this.topRated = topRated;
		this.id = this.generateId();
		this.authors = authors;
	}

	private generateId(): number {
		return Math.floor(Math.random() * 1000000) + (new Date()).getTime();
	}
}
