import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/_models/post';
import * as ClassicEditor from 'custom_modules/ckeditor5';

@Component({
    selector: 'new-notification-dialog',
    templateUrl: 'new-notification.html',
})
export class NewNotificationDialog {
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

    notification: Notification = new Notification();
    screenPositions: any[] = [];
    edit: boolean = false;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

    privacySelection: Array<any> = [];
    toastClasses: Array<string> = [];
    constructor(
        public dialogRef: MatDialogRef<NewNotificationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.notification = data.notification;
        this.edit = data.edit;
        this.screenPositions.push({ key: "toast-top-right", value: "Top Right" });
        this.screenPositions.push({ key: "toast-top-left", value: "Top Left" });
        this.screenPositions.push({ key: "toast-bottom-left", value: "Bottom Left" });
        this.screenPositions.push({ key: "toast-bottom-right", value: "Bottom Right" });

        this.toastClasses.push("red-theme");
        this.toastClasses.push("blue-theme");
        this.toastClasses.push("gray-theme");
        this.toastClasses.push("green-theme");
        this.toastClasses.push("black-theme");
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.notification.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

    }

    remove(tag: string): void {
        const index = this.notification.tags.indexOf(tag);

        if (index >= 0) {
            this.notification.tags.splice(index, 1);
        }
    }

}
