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
import { AuthState, NewUser } from 'src/app/interface';
import { signupAction } from '../../state/auth.actions';
import { signupErrorMsgSelector } from '../../state/auth.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public signupFormGroup!: FormGroup;
  public hasFormError = false;
  public passwordMatchError = false;
  public errors!: string | null;
  public reponseError = false;
  private apiErrorSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeSignupForm();
    this.apiErrorSubscription = this.store
      .select(signupErrorMsgSelector)
      .subscribe((error) => {
        this.errors = error;
      });
  }

  private initializeSignupForm(): void {
    this.signupFormGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  public signup(): void {
    if (this.signupFormGroup.invalid) {
      this.hasFormError = true;
      return;
    }
    if (
      this.signupFormGroup.value.password !==
      this.signupFormGroup.value.confirmPassword
    ) {
      this.passwordMatchError = true;
      return;
    }

    const newUser: NewUser = {
      firstName: this.signupFormGroup.value.firstName,
      middleName: this.signupFormGroup.value.middleName,
      lastName: this.signupFormGroup.value.lastName,
      email: this.signupFormGroup.value.email,
      password: this.signupFormGroup.value.password,
    };
    // console.log(this.signupFormGroup);
    this.reponseError = true;
    this.store.dispatch(signupAction({ newUser }));
  }

  public resetError(): void {
    this.hasFormError = false;
    this.passwordMatchError = false;
  }

  get signupFrom(): { [key: string]: AbstractControl } {
    return this.signupFormGroup.controls;
  }

  public navigateToLogin(): void {
    this.router.navigate(['auth', 'login']);
  }

  ngOnDestroy(): void {
    if (this.apiErrorSubscription) {
      this.apiErrorSubscription.unsubscribe();
    }
  }
}
