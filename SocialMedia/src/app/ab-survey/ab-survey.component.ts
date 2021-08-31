import { SurveyService } from './../_services/survey.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ABSurvey } from '../_models/survey';

@Component({
  selector: 'app-ab-survey',
  templateUrl: './ab-survey.component.html',
  styleUrls: ['./ab-survey.component.scss']
})
export class AbSurveyComponent implements OnInit {

  constructor(private router: Router,
    private surveyService: SurveyService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'] as number;
      if (!id) {
        return;
      }

      this.surveyService.getAbSurvey(id).subscribe((data: ABSurvey) => {
        console.log(data);
        if (data.visit % 2 == 0) {
          this.router.navigate(["/survey/" + data.survey_A_id])
        } else {
          this.router.navigate(["/survey/" + data.survey_B_id])
        }
      });
    });

  }

}
