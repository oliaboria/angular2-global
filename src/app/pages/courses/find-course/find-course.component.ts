import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 EventEmitter,
		 Input,
		 Output,
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
	@Output() coursesChange = new EventEmitter();

	query: string;

	constructor(private filterPipe: FilerByNamePipe) {
		this.query = '';
	}

	findCourse(): void {
		let filteredArr = this.filterPipe.transform(this.courses, this.query);

		if (filteredArr.length) {
			this.coursesChange.emit(filteredArr);
		}
	}
}
