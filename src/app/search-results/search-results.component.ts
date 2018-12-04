import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryStringChangeOptions } from '../app.component';
import { SearchResults } from '../hacker-new.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  public searchString: FormControl = new FormControl('');

  @Input() public searchResults: SearchResults;
  @Output() public queryStringChange: EventEmitter<QueryStringChangeOptions> = new EventEmitter();
  
  ngOnInit() {
    this.searchString.valueChanges.subscribe(newStr => this.queryStringChange.emit(newStr));
  }

  public hasSearchStr(): boolean {
    return this.searchString.value.length > 0;
  }

  public onClear(): void {
    this.searchString.setValue('');
  }
}
