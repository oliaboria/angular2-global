import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../interfaces';

@Pipe({
	name: 'orderBy',
	pure: false
})
export class OrderByPipe implements PipeTransform {
	transform(array: Course[], fields: string[], order: string[]): Course[] {
		return _.orderBy(array, fields, order);
	}
}
