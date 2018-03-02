import { Injectable } from '@angular/core';
import { Post } from "../models/post";
import { Comment } from "../models/comment";
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from './../services/authneticateService';
import { Observable } from 'rxjs';
import { UrlService } from './urlService'
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PostsService {

    constructor(private http: HttpClient, private authService : AuthenticateService, private urlService : UrlService) {}

    getAllPosts() : Observable<Post[]> {
        this.authService.login();

        return this.http.get<Post[]>(this.urlService.postsGetAll);
    }

    doesUserLikePost(postId : number) : Observable<boolean> {
        this.authService.login();

        return this.http.get<boolean>(this.urlService.doesUserLikePost + '?postId=' + postId);
    }

    likePost(postId : number) {
        this.authService.login();
        
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.urlService.likePost, postId, {headers: headers, responseType: 'text'}).toPromise().then(); //todo change this
    };
}