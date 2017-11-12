import { Injectable } from '@angular/core';
import { Post } from "../models/post";
import { Comment } from "../models/comment";
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from './../services/authneticateService';
import { Observable } from 'rxjs';
import { UrlService } from './urlService'

@Injectable()
export class PostsService {

    constructor(private http: HttpClient, private authService : AuthenticateService, private urlService : UrlService) {}

    getAllPosts() : Observable<Post[]> {
        this.authService.login();

        return this.http.get<Post[]>(this.urlService.postsGetAll);
    }
}