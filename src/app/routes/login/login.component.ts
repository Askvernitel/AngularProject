import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@app/services';
import { LoginDTO } from '@app/dto';
import { Router } from '@angular/router';
import { RouterPaths } from '@app/enums/router-paths';
import { SessionService } from '@app/services/session/session.service';
import { RoleType } from '@app/enums/role-type';
import { Role } from '@app/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected loginUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.loginUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  protected handleSubmit(): void {
    if (!this.loginUserForm.valid) {
      return;
    }
    const user: LoginDTO = this.loginUserForm.value;
    this.userService
      .login(user)
      .subscribe({
        next: (JWTToken: string) => {

          if (!JWTToken) return;
          localStorage.setItem("token", JWTToken);
          //TODO: place this code in function
          const roleId = this.sessionService.getRoleId();
          if (roleId == RoleType.ADMIN) {
            this.router.navigateByUrl(RouterPaths.ADMIN)
          } else if (roleId == RoleType.WORKER) {
            console.log("success worker");
            this.router.navigateByUrl(RouterPaths.WORKER)
          }
        },
        error: () => {

        }
      });
  }
}
