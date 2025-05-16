import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
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
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
      return
    }

    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        username: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      },
    )
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get("password")?.value
    const confirmPassword = formGroup.get("confirmPassword")?.value

    if (password !== confirmPassword) {
      formGroup.get("confirmPassword")?.setErrors({ passwordMismatch: true })
    } else {
      formGroup.get("confirmPassword")?.setErrors(null)
    }
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    // Stop here if form is invalid
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
        this.router.navigate(["/"])
      },
      error: (error) => {
        this.error = error
        this.loading = false
      },
      complete: () => {
        this.loading = false
      },
    })
  }
  
}
