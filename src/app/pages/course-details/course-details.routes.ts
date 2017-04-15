import { Routes, RouterModule } from '@angular/router';

import { CourseDetailsComponent } from './course-details.component';

const courseDetailsRoutes: Routes = [
	{ path: 'course', component: CourseDetailsComponent, },
	{ path: 'course/:id', component: CourseDetailsComponent, },
];

export const routes = RouterModule.forChild(courseDetailsRoutes);
