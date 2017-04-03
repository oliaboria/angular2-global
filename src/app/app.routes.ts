import { Routes } from '@angular/router';

import { CoursesComponent } from './pages/courses';
import { LoginComponent } from './pages/login';

export const ROUTES: Routes = [
	{path: '', component: CoursesComponent},
	{path: 'courses', component: CoursesComponent},
	{path: 'login', component: LoginComponent}
];
