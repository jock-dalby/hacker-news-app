import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take, mergeMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

export interface SearchResponse {
  hitsPerPage: number;
  results: SearchResults
}

export interface SearchResults {
  hits: Hits;
  pages: number;
}

interface Hits {
  title: string;
  url: string;
  story_title: string;
  story_url: string;
}

@Injectable()
export class HackerNewsService {

  private searchStrSubect = new BehaviorSubject('');
  searchStr = this.searchStrSubect.asObservable()

  constructor(private http: HttpClient) { }

  getSearchResults() {
    return combineLatest(
      this.searchStr
    ).pipe(
      mergeMap(([searchStr]) => {
        return this.http.get<SearchResults>(`https://hn.algolia.com/api/v1/search?query=${searchStr}`).pipe(
          take(1),
          tap(console.log),
          map(response => ({
            hitsPerPage: response.hitsPerPage,
            results: {
              hits: response['hits'],
              pages: response['nbPages']
            }
          })),
        )
      })
    )
  }

  public updateSearchString(queryString: string): void {
    this.searchStrSubect.next(queryString)
  }
}