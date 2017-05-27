import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { routes } from './not-found.routes';

import { NotFoundComponent } from './not-found.component';

@NgModule({
	declarations: [
		NotFoundComponent
	],
	exports: [
		NotFoundComponent
	],
	imports: [
		routes,
		CommonModule
	]
})
export class NotFoundModule {
	constructor() {}
}
