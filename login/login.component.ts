import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash-es';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { UserService } from 'src/components/service/user/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matDialogRef: MatDialogRef<PopupComponent>;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  showPopup = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private matDialog: MatDialog
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/login';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  register() {
    this.router.navigate(['/register']);
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const userDetails = JSON.parse(sessionStorage.getItem(this.loginForm.value.email) || '{}');
    if (userDetails && userDetails.id) {
      if (userDetails.password === this.loginForm.value.password) {
        this.userService.searchUser(_.get(userDetails, 'id')).subscribe((user) => {
          localStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.authenticationService.currentUserValue;
          console.log('find user==', user);
          if (user) {
            this.router.navigateByUrl('/home');
          } else {
            this.router.navigateByUrl('/login');
          }
        })
      } else {
        this.openModal('please enter the right password');

      }
    }
    else {
      this.openModal('your are not a register user, please register your details.')
    }

  }
  openModal(info: any) {
    this.matDialogRef = this.matDialog.open(PopupComponent, {
      data: info,
      disableClose: true
    });
  }
}
