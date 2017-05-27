import { FormControl } from '@angular/forms';

export function validateDate(control: FormControl):
	{[key: string]: boolean} {

	let datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
		value = control.value,
		day,
		month,
		year;

	if (value && !value.match(datePattern)) {
		return { date: true };
	}

	if (value) {
		value = control.value.split('/');
		day = +value[0],
		month = +value[1],
		year = +value[2];
	}

	if (day < 1 || day > 31) {
		return { date: true };
	}

	if (month < 1 || month > 12) {
		return { date: true };
	}

	if (year < 1995) {
		return { date: true };
	}

	return null;
}
