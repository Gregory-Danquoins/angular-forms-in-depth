import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { createPromoRangeValidator } from "../../validators/date-range.validator";
import { filter } from "rxjs/operators";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group(
    {
      courseType: ["premium", Validators.required],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern("[0-9]+"),
        ],
      ],
      promoStartAt: [null],
      promoEndAt: [null],
      thumbnail: [null],
    },
    {
      validators: [createPromoRangeValidator()],
    }
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      const priceControl = this.form.controls.price;

      if (val.courseType == "free" && priceControl.enabled) {
        priceControl.disable({ emitEvent: false });
        priceControl.reset();
      }
      if (val.courseType == "premium" && priceControl.disabled) {
        priceControl.enable({ emitEvent: false });
      }
    });

    const draft = localStorage.getItem("STEP_2");

    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((val) => localStorage.setItem("STEP_2", JSON.stringify(val)));
  }
}
