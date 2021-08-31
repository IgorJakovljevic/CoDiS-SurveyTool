import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public isAuthenticated: boolean | undefined;
  form!: FormGroup;
  public loginInvalid: boolean | undefined;
  private formSubmitAttempt: boolean | undefined;
  private redirectUrl!: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.redirectUrl = params['redirect'] as string;
    });
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form !== undefined && this.form.valid) {
      try {
        const username = this.form?.get('username')?.value;
        const password = this.form?.get('password')?.value;
        await this.authService.login(username, password);
      } catch (errObj) {
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
