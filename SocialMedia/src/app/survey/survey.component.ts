import { PrivacySelection, SentimentSelection, Task } from './../_models/post';
import { SurveyService } from './../_services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../_models/survey';
import { Component, OnInit } from '@angular/core';
import { Post, Notification, Tag } from '../_models/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SharePostDialog } from './dialogs/sharepost.dialog';
import { PrivacySelectionService } from '../_services/privacy-selection.service';
import { SentimentSelectionService } from '../_services/sentiment-selection.service';
import { TagsService } from '../_services/tags.service';
import { Evaluation, Comment, EvaluationPost, SubmitEvaluation } from '../_models/evaluation';
import * as SurveyJS from "survey-angular";
import { EvaluationService } from '../_services/evaluation.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  survey!: Survey;
  evaluation: Evaluation = new Evaluation();
  posts: Post[] = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  tags: Tag[] = [];
  privacySelections: PrivacySelection[] = [];
  sentiment: SentimentSelection[] = [];
  surveyDone: boolean = false;
  completedSurvey: boolean = false;
  errorCode: number = 200;
  constructor(private evaluationService: EvaluationService, private sentimentSelectionService: SentimentSelectionService, private privacySelectionService: PrivacySelectionService, private tagService: TagsService, public dialog: MatDialog, private surveyService: SurveyService, private route: ActivatedRoute, private _formBuilder: FormBuilder, private toastr: ToastrService, private _snackBar: MatSnackBar) {
    this.firstFormGroup = this._formBuilder.group({
      accept: [false, Validators.requiredTrue]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.privacySelectionService.getPrivacySelections().subscribe(privacySelections => this.privacySelections = privacySelections);
    this.sentimentSelectionService.getSentimentSelections().subscribe(sentiment => this.sentiment = sentiment);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'] as number;
      if (!id) {
        return;
      }
      let loadSurveyFunc = "public";

      if (location.href.indexOf("surveypreview") > -1) {
        loadSurveyFunc = "private";
      }

      this.surveyService.getSurvey(id, loadSurveyFunc).subscribe(survey => {
        this.survey = survey;
        this.loadEvaluation();
        console.log(this.survey);
      }, error => {
        this.errorCode = error.status;
      });
    });
  }

  createSurvey() {
    console.log("SURVEY CREATING");
    this.survey.survey_json = this.survey.survey_json.trim();
    if (this.survey.survey_json.length) {
      let surveyJSON = JSON.parse(this.survey.survey_json);
      const surveyModel = new SurveyJS.Model(surveyJSON);
      surveyModel.onComplete.add((sender, options) => {
        this.surveyDone = true;
        this.evaluation.evaluation_json = JSON.stringify(sender.data);
      })
      SurveyJS.SurveyNG.render("surveyElement", { model: surveyModel });
    }

  }

  loadEvaluation(): void {
    this.evaluation = new Evaluation();
    let user_id = localStorage.getItem('user_id') as string;
    this.evaluation.user_id = parseInt(user_id, 10);
    this.evaluation.survey_id = this.survey.id;
    this.setTrackingId();

    let evaluation_json = localStorage.getItem("e_" + user_id + this.survey.id) as string;
    if (!!evaluation_json) {
      let evaluation = JSON.parse(evaluation_json);
    } else {
      localStorage.setItem("e_" + user_id + this.survey.id, JSON.stringify(this.evaluation))
    }

  }

  setTrackingId(): void {
    this.evaluation.tracking_id = localStorage.getItem("visitorId") as string;
  }

  hasEvaulationPost(post: Post): void {
    const post_id = post.id.toString();
    if (!this.evaluation.evaluation_post.has(post_id)) {
      let eval_posts = new EvaluationPost();
      eval_posts.article_id = post.id;
      eval_posts.post = new Post();
      this.evaluation.evaluation_post.set(post_id, eval_posts);
    }
  }

  getComments(post: Post): Comment[] {
    const post_id = post.id.toString();
    this.hasEvaulationPost(post);
    let eval_posts = this.evaluation.evaluation_post.get(post_id);
    if (eval_posts)
      return eval_posts.comments;
    return []
  }

  getPost(post: Post) {
    const post_id = post.id.toString();
    this.hasEvaulationPost(post);
    return this.evaluation.evaluation_post.get(post_id)?.post;
  }

  createComment(post: Post, component: SurveyComponent): void {
    let comment = new Comment();
    const post_id = post.id.toString();
    component.hasEvaulationPost(post);
    component.evaluation.evaluation_post.get(post_id)?.comments.push(comment);
    post.doComment = true;
  }

  createPost(post: Post, component: SurveyComponent): void {
    const post_id = post.id.toString();
    component.hasEvaulationPost(post);
    const dialogRef = component.dialog.open(SharePostDialog, {
      width: '70%',
      height: '55%',
      data: {
        post: component.evaluation.evaluation_post.get(post_id)?.post,
        privacySelection: component.privacySelections,
        sentiment: component.sentiment,
        tags: component.tags
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log('The dialog was closed', result);
    });
  }

  evaluateAction(correct: boolean, execFucn: Function, post: Post) {
    if (!correct) {

      this._snackBar.open("Wrong Action - Please read the task. Are you supposed to tweet this post or share it on facebook?", "OK");
      return;
    }
    execFucn(post, this);
  }

  selectionChange(event: any) {
    console.log(event);
    let selectedStep = parseInt(event.selectedStep.label, 10);
    let selectedIndex = parseInt(event.selectedIndex, 10);
    console.log(selectedStep, this.survey.articles.length);
    if (selectedIndex > this.survey.articles.length) {
      this.createSurvey();
      return;
    }
    for (let index = 0; index < this.survey.articles.length; index++) {
      const element = this.survey.articles[index] as Post;
      if (element.id == selectedStep) {
        element.notifications.forEach((notification: Notification) => {
          if (!notification.shown) {
            notification.shown = true;
            this.toastr.info(notification.text, notification.title, {
              progressBar: true,
              enableHtml: true,
              disableTimeOut: notification.hideTimeout == 0,
              timeOut: notification.hideTimeout,
              positionClass: notification.positionClass,
              toastClass: 'ngx-toastr ' + (notification.toastClass ? notification.toastClass : '')
            });
          }
        });
        return;
      }
    }
  }

  submitSurvey() {
    console.log(this.evaluation);
    this.evaluationService.submit(new SubmitEvaluation(this.evaluation)).subscribe(data => {
      this.completedSurvey = true;
    }, error => {
      this.errorCode = error.status;
    });
  }

  toggleTaskDone(task: Task) {
    task.done = !task.done;
  }

  checkTasksDone(post: Post) {
    if (post.tasks.length) {

      for (let i = 0; i < post.tasks.length; i++) {
        const task = post.tasks[i];
        if (!task.done) {
          return false;
        }
      }
    }
    return true;
  }

  finishAllTaks(post: Post) {
    for (let i = 0; i < post.tasks.length; i++) {
      post.tasks[i].done = true;
    }
  }
}
