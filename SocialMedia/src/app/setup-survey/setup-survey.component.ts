import { TranslateService } from '@ngx-translate/core';
import { PrivacySelection, SentimentSelection, Tag } from './../_models/post';
import { SurveyService } from './../_services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewArticleDialog } from './dialogs/new-article.dialog';
import { Notification, Post } from '../_models/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewNotificationDialog } from './dialogs/new-notification.dialog';
import { Survey } from '../_models/survey';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagsService } from '../_services/tags.service';
import { PrivacySelectionService } from '../_services/privacy-selection.service';
import { SentimentSelectionService } from '../_services/sentiment-selection.service';

import * as SurveyKo from "survey-knockout";
import * as SurveyCreator from "survey-creator";

SurveyCreator.StylesManager.applyTheme("default");

@Component({
  selector: 'app-setup-survey',
  templateUrl: './setup-survey.component.html',
  styleUrls: ['./setup-survey.component.scss']
})
export class SetupSurveyComponent implements OnInit {
  displayedColumns: string[] = ['Title', 'Tags', 'Sentiment', 'Privacy', 'Commenting', 'Sharing', 'Notifications', 'DeleteAction'];
  posts: Post[] = [];

  isLinear = false;
  created = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  surveyObject: Survey;

  privacySelections: PrivacySelection[] = [];
  sentiment: SentimentSelection[] = [];
  tags: Tag[] = [];

  surveyCreator!: SurveyCreator.SurveyCreator;


  constructor(
    private translate: TranslateService,
    private sentimentSelectionService: SentimentSelectionService,
    private privacySelectionService: PrivacySelectionService,
    private tagService: TagsService,
    public surveyService: SurveyService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {
    this.surveyObject = new Survey();
    this.firstFormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });

    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.privacySelectionService.getPrivacySelections().subscribe(privacySelections => this.privacySelections = privacySelections);
    this.sentimentSelectionService.getSentimentSelections().subscribe(sentiment => this.sentiment = sentiment);
  }

  createEditor() {
    this.surveyObject.survey_json = this.surveyObject.survey_json.trim();
    let survey_json = {};
    if (this.surveyObject.survey_json.length)
      survey_json = JSON.parse(this.surveyObject.survey_json.trim());
    SurveyKo.JsonObject.metaData.addProperty(
      "questionbase",
      "popupdescription:text"
    );

    SurveyKo.JsonObject.metaData.addProperty("page", "popupdescription:text");

    let options = { showEmbededSurveyTab: true, generateValidJSON: true };
    this.surveyCreator = new SurveyCreator.SurveyCreator(
      "surveyEditorContainer",
      options
    );
    this.surveyCreator.text = JSON.stringify(survey_json);
  }

  saveSurveyJson() {
    console.log(this.surveyCreator);
    if (this.surveyCreator && this.surveyCreator.text.length)
      this.surveyObject.survey_json = this.surveyCreator.text;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'] as number;
      if (!id) {
        return;
      }
      this.surveyService.getSurvey(id, "private").subscribe(survey => {
        this.surveyObject = survey
        this.posts = this.surveyObject.articles;
        this.firstFormGroup = this._formBuilder.group({
          id: [this.surveyObject.id, Validators.required],
          title: [this.surveyObject.title, Validators.required],
          description: [this.surveyObject.description, Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['']
        });
      });
      // In a real app: dispatch action to load the details here.
    });

  }

  openDialog(): void {
    console.log(this.posts);
    const dialogRef = this.dialog.open(NewArticleDialog, {
      width: '85%',
      height: '90%',
      data: {
        post: new Post(),
        privacySelection: this.privacySelections,
        sentiment: this.sentiment,
        tags: this.tags
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log('The dialog was closed', result);
      console.log(result);
      let postData = JSON.parse(JSON.stringify(this.posts));
      postData.push(result);
      console.log(postData);
      this.posts = postData;
    });
  }

  editPost(post: Post): void {
    const dialogRef = this.dialog.open(NewArticleDialog, {
      width: '85%',
      height: '90%',
      data: {
        post: post,
        edit: true,
        privacySelection: this.privacySelections,
        sentiment: this.sentiment,
        tags: this.tags
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  removePost(post: Post): void {
    const index = this.posts.indexOf(post);

    if (index >= 0) {
      this.posts.splice(index, 1);
      let postData = JSON.parse(JSON.stringify(this.posts));
      this.posts = postData;
    }
  }

  createSurvey(): void {
    let survey = new Survey();
    console.log(this);
    this.surveyObject.title = this.firstFormGroup.value.title;
    this.surveyObject.description = this.firstFormGroup.value.description;
    this.surveyObject.articles = this.posts;

    this.surveyService.saveSurvey(this.surveyObject).subscribe(createSurvey => {
      this.surveyObject = createSurvey;
      this.created = true;
      this._snackBar.open(this.translate.instant("survey.created"), "", {
        duration: 1500
      });
    }, (error) => {
      this._snackBar.open(this.translate.instant("survey.errorWhileCreating"), "", {
        duration: 1500
      });
    });

  }

  addNotification(post: Post): void {
    console.log(post);
    const dialogRef = this.dialog.open(NewNotificationDialog, {
      width: '85%',
      height: '90%',
      data: { notification: new Notification() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log('The dialog was closed', result);
      post.notifications.push(result);
    });
  }


  editNotification(notification: Notification): void {
    const dialogRef = this.dialog.open(NewNotificationDialog, {
      width: '85%',
      height: '90%',
      data: { notification: notification, edit: true }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  selectionChange(event: any) {
    let selectionLabel = event.selectedStep.label;
    if (selectionLabel == "evaluation" && this.surveyObject.survey_json.trim().length) {
      this.createEditor();
    }
  }

  deleteSurvey() {
    let snackBarRef = this._snackBar.open(this.translate.instant('survey.AreYouSure'), this.translate.instant('action.delete'));
    snackBarRef.onAction().subscribe(() => {
      this.surveyService.deleteSurvey(this.surveyObject.id).subscribe(data => {
        this._snackBar.open(this.translate.instant('survey.deleted'), "", {
          duration: 1500
        });
        this.router.navigate(["/"])
      });
    });
  }

  duplicateSurvey() {
    this.surveyObject.id = 0;
    this.posts
    for (let i = 0; i < this.posts.length; i++) {
      let post = this.posts[i] as any;
      delete post["survey_id"]
      this.posts[i] = post;
    }
    this.surveyObject.articles = [];
    this._snackBar.open(this.translate.instant('survey.duplicated'), "", {
      duration: 1500
    });
  }
}
