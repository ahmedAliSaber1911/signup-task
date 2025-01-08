import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { passwordMatchValidator } from '../../validators/password-check';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  users: User[] = [];
  emailError: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: passwordMatchValidator() });

    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any[]>('/assets/users.json').subscribe((data) => {
      this.users = data;
    });
  }
  signup() {
    const email = this.signupForm.get('email')?.value;
    const selectedUser = this.users.find((user) => user.email === email);
    if (selectedUser) {
      this.emailError = true;
    }
  }
}
