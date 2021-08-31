import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSurveyComponent } from './setup-survey.component';

describe('SetupSurveyComponent', () => {
  let component: SetupSurveyComponent;
  let fixture: ComponentFixture<SetupSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
