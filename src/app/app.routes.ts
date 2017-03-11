import { Routes } from '@angular/router';

import { CoursesComponent } from './pages/courses';

export const ROUTES: Routes = [
	{path: '', component: CoursesComponent},
	{path: 'courses', component: CoursesComponent}
];
