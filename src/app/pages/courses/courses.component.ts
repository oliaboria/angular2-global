import { Component,
		 ChangeDetectionStrategy,
		 ChangeDetectorRef,
		 OnInit,
		 OnDestroy,
		 ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../../common/interfaces';
import { CoursesService } from '../../common/services';
import { LoaderBlockService } from '../../common/components/loader-block';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./courses.styles.scss'],
	templateUrl: './courses.template.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
	items: Course[];
	coursesSub: Subscription[] = [];

	constructor(private coursesService: CoursesService, private loaderBlockService: LoaderBlockService) {
		this.items = [];
	}

	ngOnInit(): void {
		this.coursesSub.push(
			this.coursesService.getCourses().subscribe((items: Course[]) => {
				this.items = items;
		}));
	}

	ngOnDestroy(): void {
		this.coursesSub.forEach((sub: Subscription) => {
			sub.unsubscribe();
		});
	}

	onDelete(id: number): void {
		this.coursesSub.push(
			this.coursesService.removeCourse(id).subscribe(() => {
				setTimeout(() => {
						this.loaderBlockService.hide();
				}, 1000);
		}));
	}
}
