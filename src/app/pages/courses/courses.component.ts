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
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./courses.styles.scss'],
	templateUrl: './courses.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
	items: Course[];
	pageCount: number;
	start: number;
	isMoreCoursesAvailable: boolean;

	getCoursesSub: Subscription;
	removeCourseSub: Subscription;

	constructor(private cd: ChangeDetectorRef,
				private coursesService: CoursesService,
				private loaderBlockService: LoaderBlockService) {
		this.items = [];
		this.pageCount = 5;
		this.start = 0;
		this.isMoreCoursesAvailable = true;
	}

	ngOnInit(): void {
		this.getMoreCourses(0);
	}

	ngOnDestroy(): void {
		this.getCoursesSub && this.getCoursesSub.unsubscribe();
		this.removeCourseSub && this.removeCourseSub.unsubscribe();
	}

	onDelete(id: number): void {
		this.removeCourseSub = this.coursesService.removeCourse(id)
			.subscribe(() => {
				this.loaderBlockService.hide();
				this.items = [];
				this.getMoreCourses(0);
			}, () => {
				this.loaderBlockService.hide();
			});
	}

	getMoreCourses(count: number): void {
		this.start += count;
		this.getCoursesSub = this.coursesService.getCourses(this.start, this.pageCount)
			.subscribe((courses: Course[]) => {
				if (courses.length) {
					this.items = this.items.concat(courses);
				} else {
					this.isMoreCoursesAvailable = false;
				}

				window.scrollTo(0, 0);
				this.cd.markForCheck();
			});
	}
}
