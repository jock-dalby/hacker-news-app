import { Component } from '@angular/core';
import { HackerNewsService, SearchResponse } from './hacker-new.service';
import { Observable } from 'rxjs';

export interface QueryStringChangeOptions {
  queryString: string;
  pageNumber: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public searchResults$: Observable<SearchResponse>;
  
  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit(){
    this.searchResults$ = this.hackerNewsService.getSearchResults();
  }
  
  public onQueryStringChange(queryStr: string): void {
    this.hackerNewsService.updateSearchString(queryStr);
  }
}
