import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './course-details.routes';

import { CourseDetailsComponent } from './course-details.component';
import { DurationComponent } from './duration/duration.component';

import { PipeModule } from '../../common/pipes';

@NgModule({
	declarations: [
		CourseDetailsComponent,
		DurationComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MaterialModule,
		PipeModule
	],
	providers: []
})
export class CourseDetailsModule {
	constructor() {}
}
