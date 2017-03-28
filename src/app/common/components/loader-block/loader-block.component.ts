import { Component,
		 ChangeDetectorRef,
		 ChangeDetectionStrategy,
		 OnInit,
		 ViewEncapsulation } from '@angular/core';

import { LoaderBlockService } from './loader-block.service';

@Component({
	selector: 'loader-block',
	templateUrl: 'loader-block.component.html',
	styleUrls: ['./loader-block.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit {
	loading: boolean;

	constructor (private cd: ChangeDetectorRef, private loaderBlockService: LoaderBlockService) {}

	ngOnInit(): void {
		this.loaderBlockService.show.subscribe((show: boolean) => {
			this.loading = show;
			this.cd.markForCheck();
		});
	}
}
