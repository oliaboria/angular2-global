import { Routes } from '@angular/router';

import { CoursesComponent } from './pages/courses';
import { LoginComponent } from './pages/login';

export const ROUTES: Routes = [
	{ path: '', redirectTo: '/courses', pathMatch: 'full' }
];
