import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '@app/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.registerUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'),
        ],
      ],
      jobId: [
        0,
        [Validators.required, Validators.pattern('/^\d+$/')],
        (): ValidatorFn => {
          return (control: AbstractControl): ValidationErrors | null => {
            if (control.value == 0) {
              return null;
            }
            return { jobIdNotChosen: true };
          };
        },
      ],
    });
  }

  protected handleSubmit(): void {
    if (!this.registerUserForm.valid) {
      return;
    }
    const { confirmPassword, password } = this.registerUserForm.value;

    if (confirmPassword != password) {
      return;
    }
  }
}
