import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Student.AuthComponent } from './student.auth.component';

describe('Student.AuthComponent', () => {
  let component: Student.AuthComponent;
  let fixture: ComponentFixture<Student.AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Student.AuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Student.AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
