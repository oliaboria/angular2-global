import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../../../common/interfaces';

@Pipe({name: 'myFilerByName'})
export class FilerByNamePipe implements PipeTransform {
	transform(array: Course[], name: string): Course[] {
		return _.filter(array, (item: Course) => {
			 return item.title.indexOf(name) !== -1;
		});
	}
}
