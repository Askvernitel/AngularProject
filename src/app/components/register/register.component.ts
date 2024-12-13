import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { jobIdValidator } from '../../shared/Validators/job-id-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup;

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
      // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" regEx for strong password
      password: ["", [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]],
      confirmPassword: ["", [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]],
      jobId: [0, [Validators.required, Validators.pattern("/^\d+$/")], jobIdValidator()],
    }
    );
  }

  private validatePasswordsEquality(password: string, confirmPassword: string): boolean {
    return password == confirmPassword
  }

  private handleSubmit(): void {
    if (!this.registerUserForm.valid) {
      return;
    }
    const { confirmPassword, password } = this.registerUserForm.value;

    if (!this.validatePasswordsEquality(confirmPassword, password)) {
      return;
    }




  }
}
