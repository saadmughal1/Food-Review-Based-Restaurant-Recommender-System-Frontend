import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup
  loading = false
  submitted = false
  error = ""
  isMenuOpen = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return strongPassword.test(value)
    ? null
    : { weakPassword: true };
}

usernameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;
  const usernamePattern = /^[A-Za-z][A-Za-z0-9_]{3,19}$/;
  return usernamePattern.test(value) ? null : { invalidUsername: true };
};

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
      return
    }
    


    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        username: [
      "",
      [
        Validators.required,
        this.usernameValidator
      ]
    ],
    email: [
      "",
      [
        Validators.required,
        Validators.email
      ]
    ],
         password: [
      "",
      [
        Validators.required,
        this.strongPasswordValidator
      ]
    ],
      },
    )
  }

  get f() {
    return this.registerForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    if (this.registerForm.invalid) {
      return
    }

    this.loading = true

    const user = {
      firstName: this.f["firstName"].value,
      lastName: this.f["lastName"].value,
      username: this.f["username"].value,
      email: this.f["email"].value,
      password: this.f["password"].value,
    }

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(["/login"])
      },
      error: (error) => {
        this.error = error.error.message
        this.loading = false
      },
      complete: () => {
        this.loading = false
      },
    })
  }
}
