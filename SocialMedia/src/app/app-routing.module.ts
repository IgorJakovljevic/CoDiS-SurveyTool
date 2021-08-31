import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { SetupSurveyComponent } from './setup-survey/setup-survey.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { AuthComponent } from './auth/auth.component';
import { StudentAuthComponent } from './auth/student/student.auth/student.auth.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { AbSurveyComponent } from './ab-survey/ab-survey.component';
import { AbSurveyEvalComponent } from './ab-survey-eval/ab-survey-eval.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: "studentlogin",
    component: StudentAuthComponent
  },
  {
    path: "surveycreate/:id",
    component: SetupSurveyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "surveycreate",
    component: SetupSurveyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "surveypreview/:id",
    component: SurveyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "absurvey/:id",
    component: AbSurveyComponent
  },
  {
    path: "survey/:id",
    component: SurveyComponent
  },
  {
    path: "surveyresults/:id",
    component: SurveyResultsComponent
  },
  {
    path: "evalabsurvey/:id",
    component: AbSurveyEvalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
