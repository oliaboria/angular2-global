import { Routes, RouterModule } from '@angular/router';

import { CourseDetailsComponent } from './course-details.component';
import { AuthGuard, CourseDetailsGuard } from '../../common/guards';

const courseDetailsRoutes: Routes = [
	{
		path: 'courses/new',
		component: CourseDetailsComponent,
		canActivate: [AuthGuard, CourseDetailsGuard]},
	{
		path: 'courses/:id',
		component: CourseDetailsComponent,
		canActivate: [AuthGuard, CourseDetailsGuard]}
];

export const routes = RouterModule.forChild(courseDetailsRoutes);
