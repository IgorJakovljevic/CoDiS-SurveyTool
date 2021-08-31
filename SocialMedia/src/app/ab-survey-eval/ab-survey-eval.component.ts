import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubmitEvaluation } from '../_models/evaluation';
import { ABSurvey, Survey } from '../_models/survey';
import { EvaluationService } from '../_services/evaluation.service';
import { SurveyService } from '../_services/survey.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ab-survey-eval',
  templateUrl: './ab-survey-eval.component.html',
  styleUrls: ['./ab-survey-eval.component.scss']
})
export class AbSurveyEvalComponent implements OnInit {


  public surveyA!: Survey;
  public surveyAJson: any;
  public evaulationAResults: SubmitEvaluation[] = [];

  public surveyB!: Survey;
  public surveyBJson: any;
  public evaulationBResults: SubmitEvaluation[] = [];

  public evalJsonData: any = {};

  constructor(
    private translate: TranslateService,
    private surveyService: SurveyService,
    private evaluationService: EvaluationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'] as number;
      if (!id) {
        return;
      }

      this.surveyService.getAbSurvey(id).subscribe((abSurvey: ABSurvey) => {
        console.log(abSurvey);
        this.surveyService.getSurvey(abSurvey.survey_A_id, "private").subscribe(surveyData => {
          console.log(surveyData);
          this.surveyA = surveyData;
          this.surveyAJson = JSON.parse(surveyData.survey_json);
          this.evaluationService.get_by_survey(abSurvey.survey_A_id).subscribe(data => {
            console.log(data);
            this.evaulationAResults = data;

            this.evaulationAResults.forEach(element => {
              let eval_json = JSON.parse(element.evaluation_json);
              for (let eval_key in eval_json) {
                if (eval_key in this.evalJsonData) {
                  this.evalJsonData[eval_key].push(eval_json[eval_key]);
                } else {
                  this.evalJsonData[eval_key] = [eval_json[eval_key]];
                }
              }

            });

            console.log(this);
            this.surveyAJson.pages.forEach((page: { elements: any[]; }) => {
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
                  element["results"] = [];

                  if (!this.evalJsonData[element.name]) {
                    return;
                  }
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
            this.loadBSurvey(abSurvey);

          }, error => {
            console.log(error);
          });

        });


      });
    });
  }

  loadBSurvey(data: ABSurvey) {
    this.surveyService.getSurvey(data.survey_B_id, "private").subscribe(surveyData => {
      console.log(surveyData);
      this.surveyB = surveyData;
      this.surveyBJson = JSON.parse(surveyData.survey_json);
      this.evaluationService.get_by_survey(data.survey_B_id).subscribe(data => {
        console.log(data);
        this.evaulationBResults = data;

        this.evaulationBResults.forEach(element => {
          let eval_json = JSON.parse(element.evaluation_json);
          for (let eval_key in eval_json) {
            if (eval_key in this.evalJsonData) {
              this.evalJsonData[eval_key].push(eval_json[eval_key]);
            } else {
              this.evalJsonData[eval_key] = [eval_json[eval_key]];
            }
          }

        });

        console.log(this);
        this.surveyBJson.pages.forEach((page: { elements: any[]; }) => {
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
              element["results"] = [];

              if (!this.evalJsonData[element.name]) {
                return;
              }
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

        for (const key in this.evalJsonData) {
          if (Object.prototype.hasOwnProperty.call(this.evalJsonData, key)) {
            const element = this.evalJsonData[key];
            this.evalJsonData[key] = this.formatOccurences(element);
          }
        }

      }, error => {
        console.log(error);
      });


    });
  }


  formatOccurences(arr: Array<any>) {
    return arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  }

  getEvalStats(result: any, element: any) {
    if (result) {

      if (element.type == "ranking") {
        let order = ""
        for (let i = 0; i < result.key.length; i++) {
          const seleciton = result.key[i];
          let choiceElement = element.choices.find((x: any) => x.value == seleciton)
          order += " " + choiceElement.text + " / ";
        }

        return order + " " + result.value;
      }

      if (element.choices && element.type != "rating") {
        let choiceElement = element.choices.find((x: any) => x.value == result.key)
        return (choiceElement ? choiceElement.text : result.key) + " - " + result.value;
      }
      if (element.type == "rating") {
        return result.key + " - " + result.value;
      }

      return result.key;
    }
    return "";
  }

}
