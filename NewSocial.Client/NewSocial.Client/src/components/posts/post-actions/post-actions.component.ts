import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'post-actions',
    templateUrl: './post-actions.component.html',
    styleUrls: ['./post-actions.component.less']
  })
  export class PostActionsComponent {
    likeItImagePath : string = "/assets/like_it.jpg";
  }