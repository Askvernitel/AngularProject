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
import { GetJobDTO, JobDTO, UserDTO } from '@app/dto';
import { User } from '@app/entities';
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
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.jobs$ = this.userService.getJobs();
    this.registerUserForm.valueChanges.subscribe(console.log);
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
  private handleSuccessRegister(data: User) {
    console.log(data);
  }
  private handleFailedRegister(error: Error) {
    // TODO: add good error handling
    console.log(error);
  }
  protected handleSubmit(): void {
    if (!this.registerUserForm.valid) {
      console.log("hee");
      return;
    }
    console.log("here")
    const { confirmPassword, password } = this.registerUserForm.value;

    if (confirmPassword != password) {
      return;
    }
    const user: UserDTO = this.registerUserForm.value as UserDTO;

    //register
    this.userService.register(user).subscribe({
      next: this.handleSuccessRegister,
      error: this.handleFailedRegister,
    });
  }

}
