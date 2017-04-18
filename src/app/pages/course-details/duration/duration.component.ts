import { Component,
		 Input,
		 ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';

import { Course } from '../../common/interfaces';
import { CoursesService } from '../../common/services';
import { CourseItem } from '../../common/helper-classes';
import { LoaderBlockService } from '../../common/components/loader-block';

@Component({
	selector: 'duration',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styleUrls: ['./duration.styles.scss'],
	templateUrl: './duration.template.html'
})
export class DurationComponent {
	@Input() courseDuration;
}
