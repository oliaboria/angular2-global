import { Routes, RouterModule } from '@angular/router';

import { CourseDetailsComponent } from './course-details.component';
import { CourseDetailsGuard } from './course-details.guard';

const courseDetailsRoutes: Routes = [
	{ path: 'courses/new', component: CourseDetailsComponent, canActivate: [CourseDetailsGuard]},
	{ path: 'courses/:id', component: CourseDetailsComponent, canActivate: [CourseDetailsGuard]}
];

export const routes = RouterModule.forChild(courseDetailsRoutes);
