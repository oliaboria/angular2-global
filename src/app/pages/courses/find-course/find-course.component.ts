import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 EventEmitter,
		 Input,
		 Output,
		 OnChanges,
		 OnInit,
		 OnDestroy,
		 SimpleChanges,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../../../common/interfaces';

import { CoursesService } from '../../../common/services';

import { FilerByNamePipe } from '../../../common/pipes/filter-by-name.pipe';

@Component({
	selector: 'find-course',
	encapsulation: ViewEncapsulation.None,
	providers: [ FilerByNamePipe ],
	styleUrls: ['./find-course.styles.scss'],
	templateUrl: './find-course.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindCourseComponent implements OnDestroy {
	@Input() courses: Course[];
	@Output() find = new EventEmitter();

	findCourseSub: Subscription;

	query: string;

	constructor(private filterPipe: FilerByNamePipe,
				private coursesService: CoursesService) {
		this.query = '';
	}


	ngOnDestroy(): void {
		this.findCourseSub && this.findCourseSub.unsubscribe();
	}

	findCourse(): void {
		let filteredArr = this.filterPipe.transform(this.courses, this.query);

		this.findCourseSub = this.coursesService.findCourses(this.query)
			.subscribe(() => {
				console.log('success search request');
			});

		this.find.emit(filteredArr);
	}
}
