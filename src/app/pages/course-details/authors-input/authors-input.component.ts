import { Component,
		 forwardRef,
		 Input,
		 OnInit,
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

	resultIds: number[] = [];

	propagateChange = (obj: number[]) => {};

	writeValue(authors: CourseAuthors[]) {
		if (authors) {
			authors.forEach((author: CourseAuthors) => {
				this.resultIds.push(author.id);
			});
		}
	}

	registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	onChange(event): void {
		const id = event.source.id;

		if (event.checked) {
			this.resultIds.push(id);
		} else {
			const deletedIndex = this.resultIds.findIndex((authorId: number) => authorId === id);
			this.resultIds.splice(deletedIndex, 1);
		}

		this.propagateChange(this.resultIds);
	}
}
