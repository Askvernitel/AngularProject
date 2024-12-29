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
    private router: Router
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
          //TODO: place this code in function
          const claims = JSON.parse(atob(JWTToken.split(".")[1]));
          const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          //TODO: handle this case properly
          const role = claims[roleKey]
          if (!role) return;
          localStorage.setItem("token", JWTToken);
          if (role == 1) {
            this.router.navigate(["admin"])
          } else {
            this.router.navigate(["worker"])
          }
        },
        error: () => {

        }
      });
  }
}
