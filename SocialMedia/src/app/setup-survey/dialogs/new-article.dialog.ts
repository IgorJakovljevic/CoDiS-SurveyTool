import { PrivacySelection, SentimentSelection, Task } from './../../_models/post';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post, Tag } from 'src/app/_models/post';
import * as ClassicEditor from 'custom_modules/ckeditor5';


@Component({
    selector: 'new-article-dialog',
    templateUrl: 'new-article.html',
})
export class NewArticleDialog {
    public codeMode: boolean = false;
    public Editor = ClassicEditor;
    public editorConfig =
        {

            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'imageUpload',
                    'blockQuote',
                    'insertTable',
                    'mediaEmbed',
                    'undo',
                    'redo',
                    'alignment',
                    'code',
                    'codeBlock',
                    'fontBackgroundColor',
                    'fontColor',
                    'fontSize',
                    'fontFamily',
                    'strikethrough',
                    'specialCharacters',
                    'superscript'
                ]
            },
            language: 'en',
            image: {
                toolbar: [
                    'imageTextAlternative',
                    'imageStyle:full',
                    'imageStyle:side'
                ]
            },
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableCellProperties',
                    'tableProperties'
                ]
            },
            licenseKey: ''

        };
    @Input() privacySelection: PrivacySelection[] = [];
    possibleTags: Tag[] = [];

    post: Post = new Post();
    edit: boolean = false;
    sentiment: SentimentSelection[] = [];
    selectable = true;
    removable = true;
    trackByfn = (index: number) => index;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

    constructor(
        public dialogRef: MatDialogRef<NewArticleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data);
        this.post = data.post;
        this.edit = data.edit;
        this.privacySelection = data.privacySelection;
        this.possibleTags = data.tags;
        this.sentiment = data.sentiment;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    filtertags() {
        if (!this.tagInput)
            return []
        let inputValue = this.tagInput.nativeElement.value
        if (inputValue.length > 2) {
            return this.possibleTags.filter(x => x.text.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
        }
        return []
    }

    addTag(tag: Tag) {
        this.post.tags.push(tag);
        this.tagInput.nativeElement.value = "";
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

    public addTask() {
        if (!this.post.tasks) {
            this.post.tasks = [];
        }
        this.post.tasks.push(new Task(""));
    }

    public deleteTask(index: number) {
        this.post.tasks.splice(index, 1);
    }
}
