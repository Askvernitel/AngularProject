import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StorageService, UserService } from '@app/services';
import { LoginDTO } from '@app/dto';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { SessionService } from '@app/services/session/session.service';
import { RoleType } from '@app/enums/role-type';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { LoginError } from '@app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected loginUserForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  protected loginError: LoginError = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService,
    private storageService: StorageService,
  ) {
    this.loginUserForm = new FormGroup<{
      email: FormControl<string | null>;
      password: FormControl<string | null>;
    }>({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    //this.userService.logout();
    this.loginUserForm.statusChanges.subscribe((_) => {
      this.resetLoginError();
    });
  }
  protected get email() {
    return this.loginUserForm.value.email;
  }
  protected get password() {
    return this.loginUserForm.value.password;
  }
  private resetLoginError() {
    this.loginError.loginError = undefined;
  }

  protected checkEmail() {
    if (!this.email) {
      this.loginError.emailError = 'Email Is Required';
    } else if (this.loginUserForm.controls.email.invalid) {
      this.loginError.emailError = 'Email Is Invalid';
    }
  }

  protected checkPassword() {
    if (!this.password) {
      this.loginError.passwordError = 'Password Is Required';
    }
  }

  protected handleLoginError(this: LoginComponent, error?: Error) {
    this.resetLoginError();

    if (this.loginUserForm.invalid) {
      this.checkEmail();
      this.checkPassword();
    }

    if (error) {
      switch (error?.message) {
        case '0':
          this.loginError.loginError = 'Connection Error, Try Again';
          break;
        case String(HttpStatusCode.NotFound):
          this.loginError.loginError =
            'No User Found With Such Email And Password';
          break;
        case String(HttpStatusCode.InternalServerError):
          this.loginError.loginError = 'Incorrect Password';
          break;
        default:
          this.loginError.loginError = 'Something Went Wrong!';
          break;
      }

      console.error(this.loginError.loginError);
    }
  }

  protected handleSubmit(): void {
    if (this.loginUserForm.invalid) {
      this.handleLoginError();
      return;
    }

    const { email, password } = this.loginUserForm.value as {
      email: string;
      password: string;
    };

    const user: LoginDTO = new LoginDTO(email, password);
    this.userService.login(user).subscribe({
      next: (JWTToken: string) => {
        if (!JWTToken) return;
        this.storageService.setItem('token', JWTToken);
        const roleId = this.sessionService.roleId;
        if (roleId == RoleType.ADMIN) {
          this.router
            .navigateByUrl(RouterPaths.ADMIN)
            .then((value) =>
              console.log(
                value ? 'Navigated to admin' : 'Failed to navigate to admin',
              ),
            );
        } else if (roleId == RoleType.WORKER) {
          this.router
            .navigateByUrl(RouterPaths.WORKER)
            .then((value) =>
              console.log(
                value ? 'Navigated to worker' : 'Failed to navigate to worker',
              ),
            );
        }
      },
      error: (error: Error) => {
        this.handleLoginError(error);
      },
    });
  }
}
