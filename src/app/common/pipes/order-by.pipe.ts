import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../interfaces';

@Pipe({name: 'myOrderBy'})
export class OrderByPipe implements PipeTransform {
	transform(array: Course[], field?: string): Course[] {
		return _.sortBy(array, [field]);
	}
}
