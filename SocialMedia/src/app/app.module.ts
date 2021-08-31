import { StudentAuthGuard } from './_guards/student.auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetupSurveyComponent } from './setup-survey/setup-survey.component';
import { environment } from '../environments/environment';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharepostComponent } from './sharepost/sharepost.component';
import { PostComponent } from './post/post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewArticleDialog } from './setup-survey/dialogs/new-article.dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { SurveyComponent } from './survey/survey.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewNotificationDialog } from './setup-survey/dialogs/new-notification.dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ArticleComponent } from './article/article.component';
import { CommentComponent } from './comment/comment.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { StudentAuthComponent } from './auth/student/student.auth/student.auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { SharePostDialog } from './survey/dialogs/sharepost.dialog';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FooterComponent } from './footer/footer.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackModalComponent } from './feedback/dialog/feedback-modal/feedback-modal.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AbSurveyComponent } from './ab-survey/ab-survey.component';
import { SafeHTML } from './_pipes/sanitizer.pipe';
import { AbSurveyEvalComponent } from './ab-survey-eval/ab-survey-eval.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SetupSurveyComponent,
    SharepostComponent,
    PostComponent,
    NewArticleDialog,
    NewNotificationDialog,
    SurveyComponent,
    ArticleComponent,
    CommentComponent,
    AuthComponent,
    StudentAuthComponent,
    DashboardComponent,
    SharePostDialog,
    FooterComponent,
    FeedbackComponent,
    FeedbackModalComponent,
    SurveyResultsComponent,
    AbSurveyComponent,
    SafeHTML,
    AbSurveyEvalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatStepperModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    CKEditorModule,
    ClipboardModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatSidenavModule,
    NgxChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MarkdownService,
    AuthService,
    AuthGuard,
    StudentAuthGuard
  ],
  bootstrap: [AppComponent],
  exports: [
    SafeHTML
  ]
})
export class AppModule {
  constructor() {
  }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
