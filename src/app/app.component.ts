import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';

const SEARCH_STRING_MIN_LENGTH = 6;

interface SearchResults {
  hits: Hits;
  pages: number;
}

interface Hits {
  title: string;
  url: string;
  story_title: string;
  story_url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoading: boolean;
  public searchString: FormControl = new FormControl('', Validators.minLength(6));

  public searchResults$: Observable<SearchResults>;
  public searchPage: number = 1;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.searchString.valueChanges.subscribe(this.startNewSearch.bind(this));
    this.searchHackerNews();
  }
  
  public searchHackerNews(): void {
    if (this.searchString.value.length < SEARCH_STRING_MIN_LENGTH) {
      this.resetSearch();
    } else {
      this.performSearch();
    }
  }
    
  public resetSearch(): void {
    this.searchResults$ = null
    this.isLoading = false;
  }

  public performSearch(): void {
    this.isLoading = true;
    this.searchResults$ = this.http.get(`https://hn.algolia.com/api/v1/search?query=${this.searchString.value}&page=${this.searchPage}`).pipe(
      map(response => ({
        hits: response['hits'],
        pages: response['nbPages']
      })),
      tap(() => this.isLoading = false)
    )
  }

  public startNewSearch(): void {
    this.searchPage = 1;
    this.searchHackerNews();
  }

  public onClear(): void {
    this.searchPage = 1;
    this.searchString.setValue('');
    this.searchResults$ = null;
  }

  public handleOnNext(): void {
    this.searchPage++;
    this.searchHackerNews();
  }
  
  public handleOnPrevious(): void {
    this.searchPage--;
    this.searchHackerNews();
  }
}
