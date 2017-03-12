import { Course } from '../interfaces';

export class CourseItem implements Course {
	title: string;
	id: number;
	createDate: Date;
	duration: string;
	description: string;

	constructor(title: string, createDate: Date, duration: string, description: string) {
		this.title = title;
		this.createDate = createDate;
		this.duration = duration;
		this.description = description;
		this.id = this.generateId();
	}

	private generateId(): number {
		return Math.floor(Math.random() * 1000000) + (new Date()).getTime();
	}
}
