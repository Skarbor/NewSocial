import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PostsComponent } from './../components/posts/posts.component';
import { AutoResizedTextareaComponent } from './../components/auto-resized-textarea/auto-resized-textarea.component';
import { PostsService } from './../services/postsService';
@NgModule({
  declarations: [
    AppComponent,
    AutoResizedTextareaComponent,
    PostsComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
