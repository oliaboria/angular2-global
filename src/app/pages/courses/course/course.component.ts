import { Component,
		 ChangeDetectionStrategy,
		 EventEmitter,
		 Input,
		 ViewEncapsulation,
		 Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ConfirmationModalComponent } from './confirmation-modal';
import { Course } from '../../../common/interfaces';
import { LoaderBlockService } from '../../../common/components/loader-block';

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

	constructor(public dialog: MdDialog, private router: Router, private loaderBlockService: LoaderBlockService) {}

	delete(): void {
		let dialogRef = this.dialog.open(ConfirmationModalComponent);

		dialogRef.componentInstance.title = this.item.title;

		dialogRef.afterClosed().subscribe((result: string) => {
			if (result === 'Yes') {
				this.loaderBlockService.display();
				this.deleteCourse.emit(this.item.id);
			}
		});
	}

	edit(id: string): void {
		this.router.navigate(['/courses', id]);
	}
}
