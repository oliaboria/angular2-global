import { FormControl } from '@angular/forms';

export function validateDuration(control: FormControl):
	{[key: string]: boolean} {

	let durationPattern = /^\d+$/,
		value = control.value;

	if (value && !value.match(durationPattern)) {
		return { duration: true };
	}

	return null;
}
