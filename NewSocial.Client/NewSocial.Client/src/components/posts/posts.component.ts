import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../services/postsService';
import { Post } from './../../models/post';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less']
})
export class PostsComponent implements OnInit {
  likeItImagePath : string = "/assets/like_it.jpg";
  userPicture : string ="/assets/user_picture.jpg";
  posts : Array<Post>;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() 
  {
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  onAddComment(postId: number, commentText : string) {
    alert("added a comment " + commentText);
  }
}