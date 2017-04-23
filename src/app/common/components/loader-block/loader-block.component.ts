import { Component,
		 ChangeDetectorRef,
		 ChangeDetectionStrategy,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { LoaderBlockService } from './loader-block.service';

@Component({
	selector: 'loader-block',
	templateUrl: 'loader-block.component.html',
	styleUrls: ['./loader-block.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit, OnDestroy {
	loading: boolean;
	loadingSub: Subscription;

	constructor (private cd: ChangeDetectorRef, private loaderBlockService: LoaderBlockService) {}

	ngOnInit(): void {
		this.loadingSub = this.loaderBlockService.show.subscribe((show: boolean) => {
			this.loading = show;
			this.cd.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.loadingSub.unsubscribe();
	}
}
