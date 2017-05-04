import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

// Route Configuration
const loginRoutes: Routes = [
	{ path: '404', component: NotFoundComponent },
	{ path: '**', redirectTo: '/404' }
];

export const routes = RouterModule.forChild(loginRoutes);
