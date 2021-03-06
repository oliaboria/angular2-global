﻿import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './courses.routes';

import { ConfirmationModalComponent } from './course/confirmation-modal';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { FindCourseComponent } from './find-course';

import { LoaderBlockComponent } from '../../common/components/loader-block';
import { ColorByDateDirective } from '../../common/directives/color-by-date.directive';

import { PipeModule } from '../../common/pipes';

import { AuthGuard } from '../../common/guards';

@NgModule({
	entryComponents: [ConfirmationModalComponent],
	declarations: [
		ConfirmationModalComponent,
		ColorByDateDirective,
		CourseComponent,
		CoursesComponent,
		FindCourseComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MaterialModule,
		PipeModule
	],
	providers: [
		AuthGuard
	]
})
export class CoursesModule {
	constructor() {}
}
