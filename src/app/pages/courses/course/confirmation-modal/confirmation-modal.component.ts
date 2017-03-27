import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
	selector: 'confirmation-modal',
	templateUrl: './confirmation-modal.template.html',
	styleUrls: ['./confirmation-modal.styles.scss'],
})
export class ConfirmationModalComponent {
	title: string;

	constructor(public dialogRef: MdDialogRef<ConfirmationModalComponent>) {}
}
