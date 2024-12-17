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
import { UserDTO } from '@app/dto';
import { User } from '@app/entities';
import { UserService } from '@app/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.registerUserForm.statusChanges.subscribe(console.log);
    this.registerUserForm.valueChanges.subscribe(console.log);
  }

  private formInit(): void {
    this.registerUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
      jobId: [
        '',
        [Validators.required]

      ],
    });
  }
  private handleSuccessRegister(data: User) {
    // TODO: add good successfull registeration handling
    console.log(data);
  }
  private handleFailedRegister(error: Error) {
    // TODO: add good error handling
    console.log(error);
  }
  protected handleSubmit(): void {
    if (!this.registerUserForm.valid) {
      return;
    }
    const { confirmPassword, password } = this.registerUserForm.value;

    if (confirmPassword != password) {
      this.handleFailedRegister(new Error("Passwords Don't match"));
      return;
    }
    const user: UserDTO = this.registerUserForm.value as UserDTO;
    this.userService.register(user).subscribe(
      this.handleSuccessRegister,
      this.handleFailedRegister,

    );
  }
}
