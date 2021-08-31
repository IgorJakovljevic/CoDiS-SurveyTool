import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbSurveyComponent } from './ab-survey.component';

describe('AbSurveyComponent', () => {
  let component: AbSurveyComponent;
  let fixture: ComponentFixture<AbSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
