import { Component,
		 forwardRef,
		 Input,
		 ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
	selector: 'date-input',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './date-input.template.html',
	providers: [
	{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => DateInputComponent),
		multi: true
	}
  ]
})
export class DateInputComponent implements ControlValueAccessor {
	@Input() createDate: string;
	@Input() control: FormControl;

	dateValue: string;

	propagateChange = (obj: string) => {};

	writeValue(value: string) {
		if (value) {
			this.createDate = value;
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
