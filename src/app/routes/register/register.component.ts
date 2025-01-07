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
import { passwordMatchValidator } from '@app/validators/password-match.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup;
  jobs$!: Observable<GetJobDTO[]>;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.jobs$ = this.userService.getJobs();
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
  protected handleSubmit(): void {
    if (!this.registerUserForm.valid) {
      return;
    }
    const { confirmPassword, password } = this.registerUserForm.value;

    if (confirmPassword != password) {
      return;
    }
    const user: UserDTO = this.registerUserForm.value as UserDTO;

    //register
    this.userService.register(user).subscribe({
      next: () => {
        this.router.navigateByUrl(RouterPaths.LOGIN);
      },
      error: () => {
        console.error("register error");
      },
    });
  }

}
