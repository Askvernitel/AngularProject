import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@app/services';
import { LoginDTO } from '@app/dto';

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
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.loginUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  private handleSuccessLogin(JWTToken: any) {
    //TODO: add authentication
    console.log(JWTToken);
  }
  private handleFailedLogin(error: Error) {
    // TODO: add good error handling
    console.log(error);
  }

  protected handleSubmit(): void {
    if (!this.loginUserForm.valid) {
      return;
    }
    const user: LoginDTO = this.loginUserForm.value;
    this.userService
      .login(user)
      .subscribe(this.handleSuccessLogin, this.handleFailedLogin);
  }
}
