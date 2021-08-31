import { PrivacySelection } from './../_models/post';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivacySelectionService {

  constructor(private http: HttpClient) { }

  getPrivacySelections() {
    return this.http.get<PrivacySelection[]>(environment.api_url + "privacySelection");
  }

  getPrivacySelection(id: number) {
    return this.http.get<PrivacySelection[]>(environment.api_url + "privacySelection/" + id);
  }
}
