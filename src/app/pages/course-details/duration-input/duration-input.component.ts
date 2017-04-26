import { Component,
		 Input,
		 forwardRef,
		 ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';

import { Course } from '../../common/interfaces';
import { CoursesService } from '../../common/services';
import { CourseItem } from '../../common/helper-classes';
import { LoaderBlockService } from '../../common/components/loader-block';

@Component({
	selector: 'duration-input',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./duration-input.styles.scss'],
	templateUrl: './duration-input.template.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DurationInputComponent),
			multi: true
		}
    ]
})
export class DurationInputComponent implements ControlValueAccessor {
	@Input() courseDuration;
	@Input() control: FormControl;

	propagateChange = (obj: number) => {};

	writeValue(value: string) {
		if (value) {
			this.courseDuration = value;
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
