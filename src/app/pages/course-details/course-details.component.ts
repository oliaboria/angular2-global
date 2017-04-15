import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../../common/interfaces';
import { CoursesService } from '../../common/services';
import { LoaderBlockService } from '../../common/components/loader-block';

@Component({
	selector: 'course-details',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./course-details.styles.scss'],
	templateUrl: './course-details.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
	course: Course;

	constructor(private coursesService: CoursesService, private loaderBlockService: LoaderBlockService) {
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {

	}
}
