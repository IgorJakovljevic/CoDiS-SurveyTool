import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SocialMedia';
  constructor(private translate: TranslateService) {

    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');
    let lang = localStorage.getItem("language");
    if (!lang) {
      this.translate.use("en");
    } else {
      this.translate.use(lang);
    }
  }
}
