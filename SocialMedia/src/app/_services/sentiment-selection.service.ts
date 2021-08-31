import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SentimentSelection } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class SentimentSelectionService {

  constructor(private http: HttpClient) { }

  getSentimentSelections() {
    return this.http.get<SentimentSelection[]>(environment.api_url + "sentimentSelection");
  }
}
