import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup!: FormGroup;
  public hasFormError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeLoginForm();
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

    console.log(this.loginFormGroup);
  }

  get loginFrom(): { [key: string]: AbstractControl } {
    return this.loginFormGroup.controls;
  }

  public resetError(): void {
    this.hasFormError = false;
  }
}
