import { Routes, RouterModule } from '@angular/router';

import { CourseDetailsComponent } from './course-details.component';

const courseDetailsRoutes: Routes = [
	{ path: 'courses/:id', component: CourseDetailsComponent, },
	{ path: 'courses/new', component: CourseDetailsComponent, },
];

export const routes = RouterModule.forChild(courseDetailsRoutes);
