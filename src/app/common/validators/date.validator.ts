import { FormControl } from '@angular/forms';

export function validateDate(control: FormControl):
	{[key: string]: boolean} {

	let datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
		value = control.value;

	if (value && !value.match(datePattern)) {
		return { date: true };
	}

	return null;
}
