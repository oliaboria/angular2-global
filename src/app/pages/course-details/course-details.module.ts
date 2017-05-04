import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './course-details.routes';

import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { CourseDetailsComponent } from './course-details.component';
import { DurationInputComponent } from './duration-input/duration-input.component';
import { DateInputComponent } from './date-input/date-input.component';

import { CourseDetailsGuard } from './course-details.guard';

import { PipeModule } from '../../common/pipes';

@NgModule({
	declarations: [
		AuthorsInputComponent,
		CourseDetailsComponent,
		DateInputComponent,
		DurationInputComponent
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
		CourseDetailsGuard
	]
})
export class CourseDetailsModule {
	constructor() {}
}
