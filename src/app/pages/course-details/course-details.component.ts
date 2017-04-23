import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';

import { Course } from '../../common/interfaces';
import { CoursesService } from '../../common/services';
import { CourseItem } from '../../common/helper-classes';
import { LoaderBlockService } from '../../common/components/loader-block';

@Component({
	selector: 'course-details',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./course-details.styles.scss'],
	templateUrl: './course-details.template.html'
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
	course: Course = new CourseItem();
	courseId: number;
	sub: Subscription;

	constructor(private route: ActivatedRoute,
				private coursesService: CoursesService,
				private loaderBlockService: LoaderBlockService) {}

	manage(): void {

	}

	ngOnInit(): void {
		this.sub = this.route.params
			.subscribe((params: Params) => {
				this.courseId = +params['id'];

				if (this.courseId) {
					let course = this.coursesService.getCourseById(this.courseId);
					this.course = course ? course : new CourseItem();
				}
			});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
