import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DurationPipe } from './durarion.pipe';
import { FilerByNamePipe } from './filter-by-name.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
	declarations: [
		DurationPipe,
		FilerByNamePipe,
		OrderByPipe
	],
	imports: [
		CommonModule,
	],
	exports: [
		DurationPipe,
		FilerByNamePipe,
		OrderByPipe
	],
	providers: []
})
export class PipeModule {
}
