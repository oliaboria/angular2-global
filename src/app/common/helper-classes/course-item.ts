import { Course } from '../interfaces';

export class CourseItem implements Course {
	title: string;
	id: number;
	createDate: Date;
	duration: number;
	description: string;
	topRated: boolean;

	constructor(title?: string, createDate?: Date, duration?: number, description?: string, topRated?: boolean) {
		this.title = title;
		this.createDate = createDate;
		this.duration = duration;
		this.description = description;
		this.topRated = topRated;
		this.id = this.generateId();
	}

	private generateId(): number {
		return Math.floor(Math.random() * 1000000) + (new Date()).getTime();
	}
}
