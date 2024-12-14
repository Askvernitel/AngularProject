import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { jobIdValidator } from '../../shared/Validators/job-id-validator';
import { User } from '../../shared/interfaces/user';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  protected registerUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

  }

  ngOnInit(): void {
    this.formInit();

  }

  private formInit(): void {
    this.registerUserForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
      jobId: ["", [Validators.required, /*Validators.pattern("/^\d+$/")*/]],
    }
    );
    this.registerUserForm.valueChanges.subscribe(console.log);
  }


  private validatePasswordsEquality(password: string, confirmPassword: string): boolean {
    return password == confirmPassword
  }

  protected handleSubmit(): void {
    if (!this.registerUserForm.valid) {
      return;
    }
    const { confirmPassword, password } = this.registerUserForm.value;

    if (!this.validatePasswordsEquality(confirmPassword, password)) {
      //don't match
      return;
    }

    const user = this.registerUserForm.value as User;

    this.userService.registerUser(user).pipe(catchError(err => throwError("Something Went Wrong"))).subscribe(res => console.log(res), err => console.log(err));
  }
}
