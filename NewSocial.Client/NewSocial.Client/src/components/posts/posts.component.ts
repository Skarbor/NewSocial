import { Component } from '@angular/core';
import { PostsService } from './../../services/postsService';
import { Post } from './../../models/post';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  likeItImagePath : string = "/assets/like_it.jpg";

  _postsService = new PostsService();
  
  getAll() : Array<Post>
  {
    return this._postsService.getAllPosts();
  }
}