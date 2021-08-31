import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ABSurvey, Survey } from '../_models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  getSurveys() {
    return this.http.get<Survey[]>(environment.api_url + "surveys/");
  }

  getSurvey(id: number, version: string = "public") {
    switch (version) {
      case "public":
        return this.http.get<Survey>(environment.api_url + "public/surveys/" + id);
      default:
        return this.http.get<Survey>(environment.api_url + "surveys/" + id);
    }
  }

  deleteSurvey(id: number) {
    return this.http.delete(environment.api_url + "surveys/" + id);
  }

  saveSurvey(survey: any) {
    let user_id = localStorage.getItem('user_id');
    survey.owner_id = parseInt(user_id == null ? "1" : user_id, 10);
    survey.articles.forEach((article: any) => {
      article.sentiment_id = article.sentiment.id;
      article.privacy_id = article.privacy.id;
      if (!article.owner_id)
        article.owner_id = survey.owner_id
    });
    if (survey.id > 0) {
      return this.http.put<Survey>(environment.api_url + "surveys/", survey);
    }
    return this.http.post<Survey>(environment.api_url + "surveys/", survey);
  }

  _getSurveys(): Survey[] {
    //TODO: Use Backend
    let surveys = localStorage.getItem("surveys") as string;
    if (!surveys)
      return [];
    return JSON.parse(surveys) as Survey[];
  }

  saveSurveys(surveys: Survey[]): Survey[] {
    let postString = JSON.stringify(surveys);
    localStorage.setItem("surveys", postString);
    return surveys;
  }


  _getSurvey(id?: number): Survey {
    let surveys = this._getSurveys() as Array<Survey>;
    let survey = surveys.find(x => x.id == id);
    return survey ? survey : new Survey().newSurvey(surveys.length + 1);
  }

  togglePublic(id: number, isPublic: boolean) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id.toString());
    urlSearchParams.append('isPublic', (isPublic ? "true" : "false"));
    let body = urlSearchParams.toString()

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded;'
    );

    return this.http.post(environment.api_url + "surveys/public?" + body, body, { headers: headers });
  }


  getAbSurvey(id: number) {
    return this.http.get<ABSurvey>(environment.api_url + "public/surveys/ab/" + id);
  }

}
