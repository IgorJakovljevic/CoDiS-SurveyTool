import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbSurveyEvalComponent } from './ab-survey-eval.component';

describe('AbSurveyEvalComponent', () => {
  let component: AbSurveyEvalComponent;
  let fixture: ComponentFixture<AbSurveyEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbSurveyEvalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbSurveyEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
