import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from '../breadcrumbs';
import { HeaderComponent } from './header.component';

@NgModule({
	declarations: [
		HeaderComponent,
		BreadcrumbsComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	exports: [HeaderComponent]
})
export class HeaderModule {

	constructor() {}
}
