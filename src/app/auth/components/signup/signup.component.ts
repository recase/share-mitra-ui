import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewUser } from 'src/app/interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupFormGroup!: FormGroup;
  public hasFormError = false;
  public passwordMatchError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeSignupForm();
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
    console.log(this.signupFormGroup);
  }

  public resetError(): void {
    this.hasFormError = false;
    this.passwordMatchError = false;
  }

  get signupFrom(): { [key: string]: AbstractControl } {
    return this.signupFormGroup.controls;
  }
}
