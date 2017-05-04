import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { Course, CourseAuthors } from '../../common/interfaces';
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
	authors: CourseAuthors[];
	routerObservable: Observable<Params>;
	authorsObservable: Observable<CourseAuthors[]>;
	allSub: Subscription;
	courseForm: FormGroup;

	constructor(private route: ActivatedRoute,
				private formBuilder: FormBuilder,
				private coursesService: CoursesService,
				private loaderBlockService: LoaderBlockService) {}

	ngOnInit(): void {
		this.routerObservable = this.route.params;
		this.authorsObservable = this.coursesService.getAuthors();
		this.formInit();

		this.allSub = Observable.combineLatest(this.routerObservable, this.authorsObservable)
			.subscribe((res: [Params, CourseAuthors[]]) => {
				this.handleCourseId(res[0]);
				this.authors = res[1];
				this.formUpdate();
			});
	}

	ngOnDestroy(): void {
		this.allSub.unsubscribe();
	}

	submit(courseForm: FormGroup): void {
		console.log(courseForm);
	}

	private handleCourseId: (params: Params) => void = (params: Params) => {
		this.courseId = +params['id'];

		if (this.courseId) {
			let course = this.coursesService.getCourseById(this.courseId);
			this.course = course ? course : new CourseItem('', null, null, '', false, []);
		}
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
			createDate: this.course.createDate,
			duration: this.course.duration,
			authors: null
		});
	}
}
