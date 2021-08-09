import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PopupComponent } from 'src/components/user/popup/popup.component';

import { AuthenticationService } from '../components/service/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    matDialogRef: MatDialogRef<PopupComponent>;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private matDialog: MatDialog
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        this.matDialogRef = this.matDialog.open(PopupComponent, {
            data: 'Please Login to Proceed Further',
            disableClose: true
          });
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}