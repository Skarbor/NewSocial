import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './../components/posts/posts.component';
import { AutoResizedTextareaComponent } from './../components/auto-resized-textarea/auto-resized-textarea.component';
;
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AutoResizedTextareaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
