import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './courses.routes';

import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { FindCourseComponent } from './find-course';

@NgModule({
	declarations: [
		CourseComponent,
		CoursesComponent,
		FindCourseComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MaterialModule
	],
	providers: []
})
export class CoursesModule {
	constructor() {}
}
