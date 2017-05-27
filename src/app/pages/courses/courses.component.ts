import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Breadcrumb, Course } from '../../common/interfaces';

import { BreadcrumbService } from '../../common/services';
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

	private filteredItems: Course[];

	constructor(private cd: ChangeDetectorRef,
				private breadcrumbService: BreadcrumbService,
				private coursesService: CoursesService,
				private loaderBlockService: LoaderBlockService) {
		this.items = [];
		this.filteredItems = [];
		this.pageCount = 5;
		this.start = 0;
		this.isMoreCoursesAvailable = true;
	}

	ngOnInit(): void {
		this.getMoreCourses(0);
		this.breadcrumbService.setCrumb();
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
			.flatMap((courses: Course[]) => courses)
			.filter((course: Course) => {
				let diff = new Date().getTime() - course.createDate.getTime();

				return (diff / (1000 * 3600 * 24)) < 14;
			})
			.toArray()
			.subscribe((courses: Course[]) => {
				if (courses.length) {
					this.items = this.filteredItems = this.items.concat(courses);
				} else {
					this.isMoreCoursesAvailable = false;
				}

				this.cd.markForCheck();
			});
	}

	onFindCourse(array: Course[]): void {
		this.filteredItems = array;
	}
}
