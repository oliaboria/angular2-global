import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[colorByDate]' })
export class ColorByDateDirective implements OnInit {
	@Input() colorByDate: Date;

    constructor(private el: ElementRef) {}

	ngOnInit(): void {
		this.color();
	}

	private addClass(name: string): void {
		this.el.nativeElement.classList.add(name);
	}

	private color(): void {
		let currentDate = new Date(),
			freshDate = new Date(new Date().setDate(currentDate.getDate() - 14));

		if (this.colorByDate < currentDate && this.colorByDate >= freshDate) {
			this.addClass('fresh');
		} else if (this.colorByDate > currentDate) {
			this.addClass('upcoming');
		}
	}
}
