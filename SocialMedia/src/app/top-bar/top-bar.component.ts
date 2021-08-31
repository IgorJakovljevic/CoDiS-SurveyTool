import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public isAuthenticated: boolean | undefined;
  constructor(private authService: AuthService, private translate: TranslateService) {
    this.authService.isAuth.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  currentLanugage() {
    return this.translate.currentLang
  }

  isParticipant() {
    return this.authService.isParticipant();
  }

  isAdmin() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout('/login');
  }

  useLanguage(language: string): void {
    localStorage.setItem("language", language);
    this.translate.use(language);
  }

}
