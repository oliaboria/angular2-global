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
	@Input() control: FormControl;

	result: number[] = [];

	propagateChange = (obj:  number[]) => {};

	writeValue(obj: any) {}

	registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	onChange(event): void {
		const id = event.source.id;

		if (event.checked) {
			this.result.push(id);
		} else {
			const deletedIndex = this.result.findIndex((authorId: number) => authorId === id);
      		this.result.splice(deletedIndex, 1);
		}

		this.propagateChange(this.result);
	}
}
