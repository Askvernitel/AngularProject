import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetJobDTO, UserDTO } from '@app/dto';
import { RouterPaths } from '@app/enums/router-paths';
import { UserService } from '@app/services';
import { RegisterError } from '@app/types/RegisterError';
import { passwordMatchValidator } from '@app/validators/password-match.validator';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
    jobId: FormControl<string | null>;
  }>;
  registerError: RegisterError = {};
  hiddenPassword: boolean = true;
  hiddenConfirmPassword: boolean = true;
  jobs$: Observable<GetJobDTO[]> = of([]);

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.registerUserForm = new FormGroup<{
      firstName: FormControl<string | null>;
      lastName: FormControl<string | null>;
      email: FormControl<string | null>;
      password: FormControl<string | null>;
      confirmPassword: FormControl<string | null>;
      jobId: FormControl<string | null>;
    }>(
      {
        firstName: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(4),
        ]),
        lastName: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl<string | null>(null, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        jobId: new FormControl<string | null>(null, [Validators.required]),
      },
      { validators: passwordMatchValidator },
    );
  }

  protected changePasswordState(type: string) {
    if (type == 'password') this.hiddenPassword = !this.hiddenPassword;
    if (type == 'confirmPassword')
      this.hiddenConfirmPassword = !this.hiddenConfirmPassword;
  }
  ngOnInit(): void {
    this.jobs$ = this.userService.getJobs();

    //for password match
    this.registerUserForm.statusChanges.subscribe((_) => {
      this.resetRegisterError();
    });
  }
  protected get email() {
    return this.registerUserForm.value.email;
  }

  protected get password() {
    return this.registerUserForm.value.password;
  }

  protected get firstName() {
    return this.registerUserForm.value.firstName;
  }
  protected get lastName() {
    return this.registerUserForm.value.lastName;
  }
  protected get confirmPassword() {
    return this.registerUserForm.value.confirmPassword;
  }
  protected get jobId() {
    return this.registerUserForm.value.jobId;
  }

  private resetRegisterError() {
    this.registerError.registerError = '';
  }

  protected checkFirstName() {
    if (!this.firstName) {
      this.registerError.firstNameError = 'First Name Is Required';
    } else if (this.firstName.length < 4) {
      this.registerError.firstNameError =
        'First Name Should Be Minimum 4 Letters Long';
    }
  }

  protected checkLastName() {
    if (!this.lastName) {
      this.registerError.lastNameError = 'Last Name Is Required';
    } else if (this.lastName.length < 4) {
      this.registerError.lastNameError =
        'Last Name Should Be Minimum 4 Letters Long';
    }
  }

  protected checkEmail() {
    if (!this.email) {
      this.registerError.emailError = 'Email Is Required';
    } else if (this.email.length < 4) {
      if (this.registerUserForm.controls.email.invalid) {
        this.registerError.emailError = 'Email Is Not Valid';
      }
    }
  }

  protected checkPassword() {
    if (!this.password) {
      this.registerError.passwordError = 'Password Is Required';
    } else if (this.password.length < 6) {
      this.registerError.passwordError =
        'Password Should Be At Least 6 Letters Long';
    }
  }

  protected checkConfirmPassword() {
    if (!this.confirmPassword) {
      this.registerError.passwordError = 'Password Is Required';
    } else if (this.confirmPassword.length < 6) {
      this.registerError.passwordError =
        'Password Should Be At Least 6 Letters Long';
    } else if (this.confirmPassword !== this.password) {
      this.registerError.registerError = 'Passwords Should Match';
    }
  }

  protected checkJobId() {
    if (!this.jobId && this.jobId) {
      this.registerError.jobIdError = 'Job Is Required';
    }
  }

  protected handleError(this: RegisterComponent): void;
  protected handleError(this: RegisterComponent, error: Error): void;
  protected handleError(this: RegisterComponent, error?: Error): void {
    if (this.registerUserForm.invalid) {
      this.checkFirstName();
      this.checkLastName();
      this.checkEmail();
      this.checkPassword();
      this.checkConfirmPassword();
      this.checkJobId();
    }

    if (error) {
      switch (error.message) {
        case '0':
          this.registerError.registerError = 'Connection Error, Try Again.';
          break;
        case String(HttpStatusCode.InternalServerError):
          this.registerError.registerError = 'User Already Exists';
          break;
        default:
          this.registerError.registerError = 'An Error Occurred';
          break;
      }

      console.error(this.registerError.registerError);
    }
  }

  protected handleSubmit(): void {
    if (this.registerUserForm.invalid) {
      this.handleError();
      return;
    }
    const user: UserDTO = this.registerUserForm.value as UserDTO;

    //register
    this.userService.register(user).subscribe({
      next: () => {
        this.router
          .navigateByUrl(RouterPaths.LOGIN)
          .then((value) =>
            console.log(value ? 'Navigated to login' : 'Navigation failed'),
          );
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }
}
