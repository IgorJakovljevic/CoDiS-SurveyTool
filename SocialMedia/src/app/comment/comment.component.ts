import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../_models/evaluation';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment = new Comment();
  disabledComment: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  sendComment() {
    this.disabledComment = true;
  }

  deleteComment(comment: Comment) {

  }

}
