import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../../services/postsService';

@Component({
    selector: 'post-actions',
    templateUrl: './post-actions.component.html',
    styleUrls: ['./post-actions.component.less']
  })
  export class PostActionsComponent implements OnInit {
    @Input() postId : number;
    likeItImagePath : string = "/assets/like_it.jpg";
    likeText : string;
    doesUserLikeIt : boolean;

    constructor(private postsService: PostsService) {}

    ngOnInit(): void {
      this.postsService.doesUserLikePost(this.postId).subscribe(result => {
        this.doesUserLikeIt = result;
        this.setLikeText();
      });    
    }

    setLikeText() {
      if(this.doesUserLikeIt) {
        this.likeText = "Ty lubisz to!";
      } else {
        this.likeText = "Lubię to!";
      }
    }

    like() {
      this.likeText = "Ty lubisz to!";
      this.postsService.likePost(this.postId);
    }
  }