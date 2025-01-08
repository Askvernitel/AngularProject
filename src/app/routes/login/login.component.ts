import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService, UserService } from '@app/services';
import { LoginDTO } from '@app/dto';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { SessionService } from '@app/services/session/session.service';
import { RoleType } from '@app/enums/role-type';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected loginUserForm!: FormGroup;
  protected loginError!: string;
  protected passwordError!: string;
  protected emailError!: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {

    //this.userService.logout();
    this.formInit();
    this.loginUserForm.statusChanges.subscribe((_) => {
      this.resetLoginError();
    });
  }
  protected get email() {
    return this.loginUserForm.get('email');
  }
  protected get password() {
    return this.loginUserForm.get('password');
  }
  private resetLoginError() {
    this.loginError = "";
  }
  protected handleLoginError(this: LoginComponent, error?: Error) {
    this.resetLoginError();
    if (this.email?.invalid && this.email?.hasError("required")) {
      this.emailError = "Email Is Required";
    } else if (this.email?.invalid && this.email?.hasError("email")) {
      this.emailError = "Email Is Invalid";
    } else if (this.password?.invalid && this.password?.hasError("required")) {
      this.passwordError = "Password Is Required";
    } else if (error?.message == "0") {
      this.loginError = "Connection Error, Try Again";
    } else if (error?.message == String(HttpStatusCode.NotFound)) {
      this.loginError = "No User Found With Such Email And Password";
    } else if (error?.message == String(HttpStatusCode.InternalServerError)) {
      this.loginError = "Incorrect Password";
    } else if (error) {
      this.loginError = "Something Went Wrong!";
    }
  }
  private formInit(): void {
    this.loginUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  protected handleSubmit(): void {
    if (!this.loginUserForm.valid) {
      this.handleLoginError();
      return;
    }
    const user: LoginDTO = this.loginUserForm.value;
    this.userService.login(user).subscribe({
      next: (JWTToken: string) => {
        if (!JWTToken) return;
        this.storageService.setItem('token', JWTToken);
        const roleId = this.sessionService.roleId;
        if (roleId == RoleType.ADMIN) {
          this.router.navigateByUrl(RouterPaths.ADMIN);
        } else if (roleId == RoleType.WORKER) {
          this.router.navigateByUrl(RouterPaths.WORKER);
        }
      },
      error: (error: Error) => {
        this.handleLoginError(error);
      },
    });
  }
}
