import { SurveyService } from './../_services/survey.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubmitEvaluation } from '../_models/evaluation';
import { EvaluationService } from '../_services/evaluation.service';
import { Survey } from '../_models/survey';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss']
})
export class SurveyResultsComponent implements OnInit {
  public evaulationResults: SubmitEvaluation[] = [];
  public evalJsonData: any = {};
  public evalPostData: any = {};
  public survey!: Survey;
  public surveyJson: any;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private evaluationService: EvaluationService,
    private surveyService: SurveyService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      let id = params['id'] as number;

      this.surveyService.getSurvey(id, "private").subscribe(surveyData => {
        this.survey = surveyData;
        this.surveyJson = JSON.parse(surveyData.survey_json);
        this.evaluationService.get_by_survey(id).subscribe(data => {
          console.log(data);
          this.evaulationResults = data;

          this.evaulationResults.forEach(element => {
            let eval_json = JSON.parse(element.evaluation_json);
            for (let eval_key in eval_json) {
              if (eval_key in this.evalJsonData) {
                this.evalJsonData[eval_key].push(eval_json[eval_key]);
              } else {
                this.evalJsonData[eval_key] = [eval_json[eval_key]];
              }
            }

            for (let ix = 0; ix < element.post_evaluations.length; ix++) {
              const post_evaluation = element.post_evaluations[ix];
              if (this.evalPostData[post_evaluation.article_id]) {
                this.evalPostData[post_evaluation.article_id].push(post_evaluation);
              } else {
                this.evalPostData[post_evaluation.article_id] = [post_evaluation];
              }
            }
          });

          console.log(this);
          this.surveyJson.pages.forEach((page: { elements: any[]; }) => {
            page.elements.forEach(element => {

              element["results"] = this.evalJsonData[element.name];


              if (element.type == 'boolean') {
                element["results"] = [{
                  'name': this.translate.instant("survey.results.bool.true"),
                  'value': this.evalJsonData[element.name].filter((x: boolean) => x == true).length
                }, {
                  'name': this.translate.instant("survey.results.bool.false"),
                  'value': this.evalJsonData[element.name].filter((x: boolean) => x == false).length
                }];
                element["options"] = {
                  type: 'vertical-bar',
                  showXAxisLabel: false,
                  showYAxisLabel: true,
                  legend: true,
                  yAxisLabel: this.translate.instant("survey.results.count")
                };
              }

              if (element.type == 'rating') {
                let ratingCount = element.rateMax ? element.rateMax : 5;
                console.log(element.name);
                element["results"] = [];

                if (!this.evalJsonData[element.name]) {
                  return;
                }
                console.log(ratingCount);
                for (let i = 0; i < ratingCount; i++) {
                  element["results"].push({
                    'name': i,
                    'value': this.evalJsonData[element.name].filter((x: number) => x == i).length
                  })
                }

                element["options"] = {
                  type: 'vertical-bar',
                  showXAxisLabel: false,
                  showYAxisLabel: true,
                  legend: true,
                  yAxisLabel: this.translate.instant("survey.results.rating")
                };
              }

            });
          });

        }, error => {
          console.log(error);
        })
      },
        error => {
          console.log(error);
        });

    })
  }

}
