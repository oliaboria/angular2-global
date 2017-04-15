import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 Input,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';

import { Course } from '../../../common/interfaces';

import { FilerByNamePipe } from '../../../common/pipes/filter-by-name.pipe';

@Component({
	selector: 'find-course',
	encapsulation: ViewEncapsulation.None,
	providers: [ FilerByNamePipe ],
	styleUrls: ['./find-course.styles.scss'],
	templateUrl: './find-course.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindCourseComponent {
	@Input() courses: Course[];

	query: string;

	constructor(private filterPipe: FilerByNamePipe) {
		this.query = '';
	}

	findCourse(): void {
		console.log('Course to find:', this.query);
		let filteredArr = this.filterPipe.transform(this.courses, this.query);
		this.courses = filteredArr;
	}
}
