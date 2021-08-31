import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getTags() {
    return this.http.get<Tag[]>(environment.api_url + "tags");
  }
}
