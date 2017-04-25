import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course, ResponseGetCourses } from '../../common/interfaces';
import { CoursesService } from '../../common/services';
import { LoaderBlockService } from '../../common/components/loader-block';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./courses.styles.scss'],
	templateUrl: './courses.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
	items: Course[];
	getCoursesSub: Subscription;
	removeCourseSub: Subscription;

	constructor(private cd: ChangeDetectorRef,
				private coursesService: CoursesService,
				private loaderBlockService: LoaderBlockService) {
		this.items = [];
	}

	ngOnInit(): void {
		this.getCoursesSub = this.coursesService.getCourses()
			.subscribe((res: ResponseGetCourses) => {
				this.items = res.courses;
				this.cd.markForCheck();
			});
	}

	ngOnDestroy(): void {
		this.getCoursesSub && this.getCoursesSub.unsubscribe();
		this.removeCourseSub && this.removeCourseSub.unsubscribe();
	}

	onDelete(id: number): void {
		this.removeCourseSub = this.coursesService.removeCourse(id)
			.subscribe(() => {
				setTimeout(() => {
					this.loaderBlockService.hide();
				}, 1000);
			});
	}
}
