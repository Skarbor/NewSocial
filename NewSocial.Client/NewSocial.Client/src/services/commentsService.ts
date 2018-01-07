import { Injectable } from '@angular/core';
import { AuthenticateService } from './authneticateService';
import { UrlService } from './urlService';
import { Observable } from 'rxjs/Observable';
import { Comment } from './../models/comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CommentsService {
    
    constructor(private http: HttpClient, private authService : AuthenticateService, private urlService : UrlService) {}
    
        getAllCommentsForPost(postId : number) : Observable<Comment[]> {
            this.authService.login();
            
            return this.http.get<Comment[]>(this.urlService.commentsGetAllForPost + '?postId=' + postId);
        }

        addComment(postId : number, text : string) {
            this.authService.login();
            
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');

            this.http.put(this.urlService.commentsAdd, {PostId: postId, Text: text}, {headers: headers, responseType: 'text'}).toPromise().then(); //todo change this
        }
}