import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, of, throwError } from 'rxjs';
import { UserService } from '@app/services';
import { LoginDTO } from '@app/dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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

  protected handleSubmit(): void {
    if (!this.loginUserForm.valid) {
      return;
    }
    const user: LoginDTO = this.loginUserForm.value;
    console.log(user);
    this.userService
      .login(user)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError('Incorrect Credentials');
        }),
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
      );
  }
}
