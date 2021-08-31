import { Survey } from './../_models/survey';
import { TranslateService } from '@ngx-translate/core';
import { SurveyService } from './../_services/survey.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['SurveyStatus', 'Title', 'Action'];

  surveys: Survey[] = [];
  constructor(private translate: TranslateService, private surveyService: SurveyService, private _snackBar: MatSnackBar, private authService: AuthService) {
    surveyService.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  ngOnInit(): void {
  }

  isParticipant() {
    return this.authService.isParticipant();
  }

  deleteSurvey(id: number) {

    let snackBarRef = this._snackBar.open(this.translate.instant('survey.AreYouSure'), this.translate.instant('action.delete'));
    snackBarRef.onAction().subscribe(() => {
      this.surveyService.deleteSurvey(id).subscribe(data => {
        this.surveyService.getSurveys().subscribe(surveys => {
          this.surveys = surveys;
          this._snackBar.open(this.translate.instant('survey.deleted'), "", {
            duration: 1500
          });
        });
      });
    });

  }

  tooglePrivacy(survey: Survey, isPublic: boolean) {
    this.surveyService.togglePublic(survey.id, isPublic).subscribe(data => {
      survey.is_public = isPublic;
    });
  }
  public surveyShareText: string = "";
  shareLink(survey: Survey) {
    this.surveyShareText = location.origin + "/survey/" + survey.id;
  }
  notifyAboutShare() {
    this._snackBar.open(this.translate.instant('survey.copiedtoClipboard'), "", { duration: 1500 });
  }
}
