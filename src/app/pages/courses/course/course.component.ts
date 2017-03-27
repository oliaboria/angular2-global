import { Component,
		 ChangeDetectionStrategy,
		 EventEmitter,
		 Input,
		 ViewEncapsulation,
		 Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { ConfirmationModalComponent } from './confirmation-modal';
import { Course } from '../../../common/interfaces';

@Component({
	selector: 'course',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./course.styles.scss'],
	templateUrl: './course.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
	@Input() item: Course;

	@Output() deleteCourse: EventEmitter<number> = new EventEmitter();

	constructor(public dialog: MdDialog) {}

	delete(): void {
		let dialogRef = this.dialog.open(ConfirmationModalComponent);

		dialogRef.componentInstance.title = this.item.title;

		dialogRef.afterClosed().subscribe((result: string) => {
			if (result === 'Yes') {
				this.deleteCourse.emit(this.item.id);
			}
		});
	}
}
