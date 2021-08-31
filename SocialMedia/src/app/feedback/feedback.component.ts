import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackModalComponent } from './dialog/feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      width: '85%',
    });
  }

}
