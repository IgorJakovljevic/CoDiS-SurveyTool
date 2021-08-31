import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../_models/post';
import * as ClassicEditor from 'custom_modules/ckeditor5';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public Editor = ClassicEditor;
  public editorConfig =
    {
      toolbar: {
        items: [
        ]
      },
      language: 'en',
      image: {
      },
      table: {
      },
      licenseKey: '',
      isReadOnly: true,

    };
  @Input() post!: Post;
  constructor() {

  }

  ngOnInit(): void {
  }

}
