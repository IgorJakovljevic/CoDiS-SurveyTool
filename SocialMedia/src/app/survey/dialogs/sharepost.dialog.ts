import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post, PrivacySelection, SentimentSelection, Tag } from 'src/app/_models/post';

@Component({
    selector: 'share-post-dialog',
    templateUrl: 'sharepost.dialog.html',
})
export class SharePostDialog {
    post!: Post;
    tags!: Tag[];
    privacySelection!: PrivacySelection[];
    sentiment!: SentimentSelection[];

    constructor(
        public dialogRef: MatDialogRef<SharePostDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.tags = data.tags;
        this.privacySelection = data.privacySelection;
        this.sentiment = data.sentiment;
        this.post = data.post;
        console.log(data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    postSave(post: Post): void {
        post.doShare = true;
        this.dialogRef.close(post);
    }
}
