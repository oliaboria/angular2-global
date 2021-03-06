import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../interfaces';

@Pipe({name: 'filerByName'})
export class FilerByNamePipe implements PipeTransform {
	transform(array: Course[], name: string): Course[] {
		return _.filter(array, (item: Course) => {
			 return item.title.toLowerCase().indexOf(name.toLowerCase()) !== -1;
		});
	}
}
