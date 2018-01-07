import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../services/postsService';
import { CommentsService } from './../../services/commentsService';
import { Post } from './../../models/post';
import { Comment } from './../../models/comment';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less']
})
export class PostsComponent implements OnInit {
  likeItImagePath : string = "/assets/like_it.jpg";
  userPicture : string ="/assets/user_picture.jpg";
  posts : Array<Post>;
  comments : Array<Comment>;
  
  constructor(private postsService: PostsService, private commentsService : CommentsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;

      this.posts.forEach(post => {
        this.getAllComments(post);
      });
    });
  }

  getAllComments(post : Post) {
    return this.commentsService.getAllCommentsForPost(post.id).subscribe(comments => {
      post.comments = comments;
    });
  }

  onAddComment(eventParams : any) {
    let comment = new Comment(1, eventParams.parentId, eventParams.text, null, Date.now());

    let post = this.posts.find(x=> x.id == eventParams.parentId);

    if(!post.comments) {
      post.comments = new Array<Comment>();
    }
    post.comments.push(comment);
    
    this.commentsService.addComment(eventParams.parentId, eventParams.text);
  }
}