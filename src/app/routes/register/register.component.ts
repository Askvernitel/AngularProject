import { HttpStatusCode } from '@angular/common/http';
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
import { Router } from '@angular/router';
import { GetJobDTO, JobDTO, UserDTO } from '@app/dto';
import { User } from '@app/entities';
import { RouterPaths } from '@app/enums/router-paths';
import { UserService } from '@app/services';
import { RegisterError } from '@app/types/RegisterError';
import { passwordMatchValidator } from '@app/validators/password-match.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup;
  registerError: RegisterError = {};
  hiddenPassword: boolean = true;
  hiddenConfirmPassword: boolean = true;
  jobs$!: Observable<GetJobDTO[]>;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  protected changePasswordState(type: string) {
    if (type == "password") this.hiddenPassword = !this.hiddenPassword;
    if (type == "confirmPassword") this.hiddenConfirmPassword = !this.hiddenConfirmPassword;
  }
  ngOnInit(): void {
    this.formInit();
    this.jobs$ = this.userService.getJobs();

    //for password match
    this.registerUserForm.statusChanges.subscribe((_) => {
      this.resetRegisterError();
    })
  }
  protected get email() {
    return this.registerUserForm.get("email")
  }

  protected get password() {

    return this.registerUserForm.get("password")
  }

  protected get firstName() {

    return this.registerUserForm.get("firstName")
  }
  protected get lastName() {
    return this.registerUserForm.get("lastName");
  }
  protected get confirmPassword() {
    return this.registerUserForm.get("confirmPassword");
  }
  protected get jobId() {
    return this.registerUserForm.get("jobId");
  }

  private formInit(): void {
    this.registerUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      jobId: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });
  }
  private resetRegisterError() {
    this.registerError.registerError = "";
  }
  //TODO: Needs To Be Separated In Some Kind Of ErrorService
  protected handleRegisterError(this: RegisterComponent, error?: Error) {
    //firstname
    if (this.firstName?.invalid && this.firstName?.getError("required")) {
      this.registerError.firstNameError = "First Name Is Required";
    } else if (this.firstName?.invalid && this.firstName?.getError("minlength")) {
      this.registerError.firstNameError = "First Name Should Be Minimum 4 Letters Long";
    }
    //lastname
    if (this.lastName?.invalid && this.lastName?.getError("required")) {
      this.registerError.lastNameError = "Last Name Is Required";
    } else if (this.lastName?.invalid && this.lastName?.getError("minlength")) {
      this.registerError.lastNameError = "Last Name Should Be Minimum 4 Letters Long";
    }
    //email
    if (this.email?.invalid && this.email?.getError("required")) {
      this.registerError.emailError = "Email Is Required";
    } else if (this.email?.invalid && this.email?.getError("email")) {
      this.registerError.emailError = "Email Is Not Valid";
    }
    //password
    if (this.password?.invalid && this.password?.getError("required")) {
      this.registerError.passwordError = "Password Is Required";
    } else if (this.password?.invalid && this.password?.getError("minlength")) {
      this.registerError.passwordError = "Password Should Be At Least 6 Letters Long";
    }
    if (this.confirmPassword?.invalid && this.confirmPassword?.getError("required")) {
      this.registerError.passwordError = "Password Is Required";
    } else if (this.confirmPassword?.invalid && this.confirmPassword?.getError("minlength")) {
      this.registerError.passwordError = "Password Should Be At Least 6 Letters Long";
    }
    else if (this.registerUserForm?.invalid && this.registerUserForm?.getError("passwordNotMatch") !== null) {
      this.registerError.registerError = "Passwords Should Match";
    }
    //job
    if (this.jobId?.invalid && this.jobId?.getError("required")) {
      this.registerError.jobIdError = "Job Is Required";
    }

    if (error?.message == "0") {
      this.registerError.registerError = "Connection Error, Try Again.";

    } else if (error?.message == String(HttpStatusCode.InternalServerError)) {
      this.registerError.registerError = "User Already Exists";
      console.log(this.registerError.registerError);
    }

  }
  protected handleSubmit(): void {
    if (!this.registerUserForm.valid) {
      this.handleRegisterError();
      return;
    }
    const user: UserDTO = this.registerUserForm.value as UserDTO;

    //register
    this.userService.register(user).subscribe({
      next: () => {
        this.router.navigateByUrl(RouterPaths.LOGIN);
      },
      error: (error) => {
        this.handleRegisterError(error)
      },
    });
  }

}
