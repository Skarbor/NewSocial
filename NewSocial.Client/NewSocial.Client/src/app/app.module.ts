import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PostsComponent } from './../components/posts/posts.component';
import { AutoResizedTextareaComponent } from './../components/auto-resized-textarea/auto-resized-textarea.component';
import { PostsService } from './../services/postsService';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticateService } from './../services/authneticateService';
import { UrlService } from './../services/urlService';
import { CommentsService } from './../services/commentsService';
import { PostActionsComponent } from './../components/posts/post-actions/post-actions.component';
@NgModule({
  declarations: [
    AppComponent,
    AutoResizedTextareaComponent,
    PostsComponent,
    PostActionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PostsService, CommentsService, AuthenticateService, UrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
