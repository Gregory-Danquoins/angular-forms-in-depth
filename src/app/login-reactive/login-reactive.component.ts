import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strengh.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {}

  form = this.fb.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      },
    ],
    password: [
      "",
      [Validators.minLength(8), createPasswordStrengthValidator()],
    ],
  });

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.email;
  }

  login() {}

  reset() {
    this.form.reset();
  }
}
