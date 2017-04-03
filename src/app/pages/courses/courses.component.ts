import { Component,
		 ChangeDetectionStrategy,
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
export class CoursesComponent implements OnInit {
	items: Course[];

	constructor(private coursesService: CoursesService, private loaderBlockService: LoaderBlockService) {
		this.items = [];
	}

	ngOnInit(): void {
		this.coursesService.getCourses().subscribe((items: Course[]) => {
			this.items = items;
		});
	}

	onDelete(id: number): void {
		this.coursesService.removeCourse(id).subscribe(() => {
			setTimeout(() => {
					this.loaderBlockService.hide();
			}, 1000);
		});
	}
}
