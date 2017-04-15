import { CommonModule } from '@angular/common';
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

import { DurationPipe } from '../../common/pipes/durarion.pipe';
import { OrderByPipe } from '../../common/pipes/order-by.pipe';
import { FilerByNamePipe } from '../../common/pipes/filter-by-name.pipe';

@NgModule({
	entryComponents: [ConfirmationModalComponent],
	declarations: [
		ConfirmationModalComponent,
		ColorByDateDirective,
		FilerByNamePipe,
		DurationPipe,
		OrderByPipe,
		CourseComponent,
		CoursesComponent,
		FindCourseComponent
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
export class CoursesModule {
	constructor() {}
}
