import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './course-details.routes';

import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { CourseDetailsComponent } from './course-details.component';
import { DurationInputComponent } from './duration-input/duration-input.component';
import { DateInputComponent } from './date-input/date-input.component';

import { AuthGuard, CourseDetailsGuard } from '../../common/guards';

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
		AuthGuard,
		CourseDetailsGuard,
		DatePipe
	]
})
export class CourseDetailsModule {
	constructor() {}
}
