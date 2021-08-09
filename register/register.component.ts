import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../service/authentication/authentication.service';
import { UserService } from '../../service/user/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  matDialogRef: MatDialogRef<PopupComponent>;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private matDialog: MatDialog,
  ) { 
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/home']);
      // }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              (data: any) => {
                 console.log('token', data);
                 if (data.token) {
                 data['email'] = this.registerForm.value.email
                 data['password'] = this.registerForm.value.password
                 localStorage.setItem('currentUser', JSON.stringify(data.token));
                 sessionStorage.setItem(this.registerForm.value.email, JSON.stringify(data));
                 this.matDialogRef = this.matDialog.open(PopupComponent, {
                  data: 'Registered Successfully',
                  disableClose: true
                });
                 }
                  this.router.navigate(['/login']);
              },
              (error: any) => {
                  this.loading = false;
              });
  }
}
