import { Component, ViewEncapsulation, Input } from '@angular/core';
import { TodoItem } from '../../../common/entities';
import { todoStatusClasses } from '../../../common/enums';

@Component({
	selector: 'todo-item',
	templateUrl: 'todo-item.component.html',
	styles: [require('./todo-item.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class TodoItemComponent {
	@Input() public todo: TodoItem;

	constructor() {
	}

	public calculateStatusClass(status): string {
		return todoStatusClasses[status];
	}
}
