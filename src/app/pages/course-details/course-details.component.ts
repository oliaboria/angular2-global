import * as _ from 'lodash';
import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { Course, CourseAuthors } from '../../common/interfaces';

import { BreadcrumbService } from '../../common/services';
import { CoursesService } from '../../common/services';

import { CourseItem } from '../../common/helper-classes';
import { LoaderBlockService } from '../../common/components/loader-block';

import { validateDate } from '../../common/validators';

@Component({
	selector: 'course-details',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./course-details.styles.scss'],
	templateUrl: './course-details.template.html'
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
	course: Course = new CourseItem('', null, null, '', false, []);
	courseId: number;
	isEditState: boolean;
	authors: CourseAuthors[];
	routerObservable: Observable<Params>;
	authorsObservable: Observable<CourseAuthors[]>;
	allSub: Subscription;
	courseSub: Subscription;
	submitCourseSub: Subscription;
	courseForm: FormGroup;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private datePipe: DatePipe,
				private formBuilder: FormBuilder,
				private breadcrumbService: BreadcrumbService,
				private coursesService: CoursesService,
				private loaderBlockService: LoaderBlockService) {}

	ngOnInit(): void {
		this.routerObservable = this.route.params;
		this.authorsObservable = this.coursesService.getAuthors();
		this.formInit();

		this.allSub = Observable.combineLatest(this.routerObservable, this.authorsObservable)
			.subscribe((res: [Params, CourseAuthors[]]) => {
				this.authors = res[1];
				this.handleCourseId(res[0]);
				this.populateCourse();
				this.formUpdate();
				this.setBreadcrumb();
			});
	}

	ngOnDestroy(): void {
		this.allSub.unsubscribe();
		this.courseSub && this.courseSub.unsubscribe();
		this.submitCourseSub && this.submitCourseSub.unsubscribe();
	}

	submit(courseForm: FormGroup): void {
		if (this.isEditState) {
			this.submitCourseSub = this.coursesService.updateCourse(this.courseId, courseForm.value)
				.subscribe(this.navgateToHome);
		} else {
			this.submitCourseSub = this.coursesService.createCourse(courseForm.value)
				.subscribe(this.navgateToHome);
		}
	}

	cancel(): void {
		this.navgateToHome();
	}

	private handleCourseId: (params: Params) => void = (params: Params) => {
		this.courseId = +params['id'];
		this.isEditState = !isNaN(this.courseId);
	}

	private formInit(): void {
		this.courseForm = this.formBuilder.group({
			title: ['', [Validators.required, Validators.maxLength(50)]],
			description: ['', [Validators.required, Validators.maxLength(500)]],
			createDate: ['', [Validators.required, validateDate]],
			duration: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
			authors: [null, Validators.required]
		});
	}

	private formUpdate(): void {
		this.courseForm.patchValue({
			title: this.course.title,
			description: this.course.description,
			createDate: this.datePipe.transform(this.course.createDate, 'dd/MM/y'),
			duration: this.course.duration,
			authors: this.course.authors
		});
	}

	private populateCourse: () => void = () => {
		if (this.isEditState) {
			let course = this.coursesService.getCourseByIdFromCollection(this.courseId);

			if (course) {
				this.course = course;
				this.checkAuthors(this.course.authors);
			} else {
				this.courseSub = this.coursesService.getCourseById(this.courseId)
					.subscribe((courseFromServer: Course) => {
						this.course = courseFromServer;
						this.checkAuthors(this.course.authors);
						this.formUpdate();
					});
			}
		} else {
			this.course = new CourseItem('', null, null, '', false, []);
		}
	}

	private checkAuthors: (authors: CourseAuthors[]) => CourseAuthors[] =
						  (authors: CourseAuthors[]) => {
		return _.merge(this.authors, authors);
	}

	private navgateToHome: () => void  = () => {
		this.router.navigate(['/courses']);
	}

	private setBreadcrumb: () => void = () => {
		if (this.isEditState) {
			this.breadcrumbService.setCrumb({
				title: `Course ${this.courseId}`,
				url: `/courses/${this.courseId}`
			});
		} else {
			this.breadcrumbService.setCrumb({
				title: `New course`,
				url: `/courses/new`
			});
		}
	}
}
