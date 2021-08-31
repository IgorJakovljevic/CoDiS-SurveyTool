import { PrivacySelection, SentimentSelection } from './../_models/post';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Post, Tag } from '../_models/post';

@Component({
  selector: 'app-sharepost',
  templateUrl: './sharepost.component.html',
  styleUrls: ['./sharepost.component.scss']
})
export class SharepostComponent implements OnInit {
  @Input() post: Post = new Post();
  @Input() tags!: Tag[];
  @Input() privacySelection!: PrivacySelection[];
  @Input() sentiment!: SentimentSelection[];

  showTags = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  @Output() callBackFunction = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.post.sentiment = new SentimentSelection();
    this.post.privacy = new PrivacySelection();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.post.tags.push(new Tag(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  remove(tag: Tag): void {
    const index = this.post.tags.indexOf(tag);

    if (index >= 0) {
      this.post.tags.splice(index, 1);
    }
  }

  public setPrivacy(element: any) {
    this.post.privacy = element;
  }

  public setSentiment(element: any) {
    this.post.sentiment = element;
  }
}
