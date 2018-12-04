import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HackerNewsService } from './hacker-new.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HackerNewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
