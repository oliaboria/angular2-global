import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
	transform(duration: number, format: string): string {
		let hours = Math.floor(duration / 60),
			mins = duration % 60,
			formatArr = format.split(' ');

		if (!hours) {
			return `${mins} ${formatArr[1]}`;
		}

		return `${hours} ${formatArr[0]} ${mins} ${formatArr[1]}`;
  }
}
