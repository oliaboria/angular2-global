import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
	course: Course = new CourseItem('', null, null, '', false, []);
	courseId: number;
	sub: Subscription;
	courseForm: FormGroup;

	constructor(private route: ActivatedRoute,
				private formBuilder: FormBuilder,
				private coursesService: CoursesService,
				private loaderBlockService: LoaderBlockService) {}

	ngOnInit(): void {
		this.sub = this.route.params
			.subscribe(this.handleCourseId);
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	manage(courseForm: FormGroup): void {
		console.log(courseForm);
	}

	private handleCourseId: (params: Params) => void = (params: Params) => {
		this.courseId = +params['id'];

		if (this.courseId) {
			let course = this.coursesService.getCourseById(this.courseId);
			this.course = course ? course : new CourseItem('', null, null, '', false, []);
		}

		this.formInit();
	}

	private formInit(): void {
		this.courseForm = this.formBuilder.group({
			title: [this.course.title, [Validators.required, Validators.maxLength(50)]]
		});
	}
}
