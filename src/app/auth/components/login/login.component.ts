import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthState } from 'src/app/interface';
import { loginAction } from '../../state/auth.actions';
import { loginErrorMsgSelector } from '../../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginFormGroup!: FormGroup;
  public hasFormError = false;
  public responseError = false;
  public apiErrorSubscription!: Subscription;
  public errors!: string | null;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
    this.apiErrorSubscription = this.store
      .select(loginErrorMsgSelector)
      .subscribe((error) => {
        this.errors = error;
      });
  }

  private initializeLoginForm(): void {
    this.loginFormGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {
    if (this.loginFormGroup.invalid) {
      this.hasFormError = true;
      return;
    }
    this.responseError = true;
    this.store.dispatch(
      loginAction({
        email: this.loginFormGroup.value.email,
        password: this.loginFormGroup.value.password,
      })
    );
  }

  get loginFrom(): { [key: string]: AbstractControl } {
    return this.loginFormGroup.controls;
  }

  public resetError(): void {
    this.hasFormError = false;
  }

  public navigateToSignup(): void {
    this.router.navigate(['auth', 'signup']);
  }

  ngOnDestroy(): void {
    if (this.apiErrorSubscription) {
      this.apiErrorSubscription.unsubscribe();
    }
  }
}
