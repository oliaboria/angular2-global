import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './course-details.routes';

import { CourseDetailsComponent } from './course-details.component';

@NgModule({
	declarations: [
		CourseDetailsComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MaterialModule
	],
	providers: []
})
export class CourseDetailsModule {
	constructor() {}
}
