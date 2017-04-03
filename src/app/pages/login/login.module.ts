import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from './login.routes';

import { LoaderBlockComponent } from '../../common/components/loader-block';
import { LoginComponent } from './login.component';

@NgModule({
	declarations: [
		LoginComponent
	],
	exports: [
		LoginComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MaterialModule
	],
	providers: []
})
export class LoginModule {
	constructor() {}
}
