import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent {
  @Input() public currentPage: number;
  @Input() public totalPages: number;
  @Output() public onPrevious: EventEmitter<null> = new EventEmitter();
  @Output() public onNext: EventEmitter<null> = new EventEmitter();
}
