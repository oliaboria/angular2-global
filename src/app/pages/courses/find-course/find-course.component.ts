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
export class FindCourseComponent implements OnDestroy, OnChanges {
	@Input() courses: Course[];
	@Output() coursesChange = new EventEmitter();

	findCourseSub: Subscription;

	query: string;
	private unsortedCourses: Course[];

	constructor(private filterPipe: FilerByNamePipe,
				private coursesService: CoursesService) {
		this.query = '';
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.unsortedCourses = changes['courses'].currentValue;
	}

	ngOnDestroy(): void {
		this.findCourseSub && this.findCourseSub.unsubscribe();
	}

	findCourse(): void {
		let filteredArr = this.filterPipe.transform(this.unsortedCourses, this.query);

		this.findCourseSub = this.coursesService.findCourses(this.query)
			.subscribe(() => {
				console.log('success search request');
			});

		this.coursesChange.emit(filteredArr);
	}
}
