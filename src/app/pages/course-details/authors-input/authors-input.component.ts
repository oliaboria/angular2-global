import { Component,
		 forwardRef,
		 Input,
		 ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { CourseAuthors } from '../../../common/interfaces';

@Component({
	selector: 'authors-input',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './authors-input.template.html',
	styleUrls: ['./authors-input.styles.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AuthorsInputComponent),
			multi: true
		}
    ]
})
export class AuthorsInputComponent implements ControlValueAccessor {
	@Input() authors: CourseAuthors[];

	propagateChange = (obj: CourseAuthors[]) => {};

	writeValue(value: CourseAuthors[]) {
		if (value) {
			this.authors = value;
		}
	}

	registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	onChange(event): void {
		this.propagateChange(event.target.value);
	}
}
