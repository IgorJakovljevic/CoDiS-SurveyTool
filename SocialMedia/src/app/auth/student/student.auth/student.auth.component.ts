import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-student.auth',
  templateUrl: './student.auth.component.html',
  styleUrls: ['./student.auth.component.scss']
})
export class StudentAuthComponent implements OnInit {
  public isAuthenticated: boolean | undefined;
  form!: FormGroup;
  public loginInvalid: boolean | undefined;
  private formSubmitAttempt: boolean | undefined;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      // TODO: Add Validators
      studentId: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form !== undefined && this.form.valid) {
      try {
        const username = this.form?.get('studentId')?.value;
        await this.authService.loginParticipant(username);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  logout() {
    this.authService.logout('/');
  }

}
