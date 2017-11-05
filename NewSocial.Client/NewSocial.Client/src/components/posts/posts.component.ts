import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../services/postsService';
import { Post } from './../../models/post';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  likeItImagePath : string = "/assets/like_it.jpg";
  userPicture : string ="/assets/user_picture.jpg";
  posts : Array<Post>;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.getAll();
  }

  getAll() : Array<Post>
  {
    var allPosts = this.postsService.getAllPosts();
    return this.postsService.getAllPosts();
  }
}