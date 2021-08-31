import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubmitEvaluation } from '../_models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }

  submit(evaluation: SubmitEvaluation) {
    return this.http.post<boolean>(environment.api_url + "evaluation/public/submit", evaluation);
  }

  get_by_survey(id: number) {
    return this.http.get<SubmitEvaluation[]>(environment.api_url + "evaluation/private/survey/" + id);
  }

  get_all() {
    return this.http.get<SubmitEvaluation[]>(environment.api_url + "evaluation/private/");
  }
}
