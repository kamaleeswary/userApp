import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/components/interface/user';
import { AuthenticationService } from 'src/components/service/authentication/authentication.service';
import { UserService } from 'src/components/service/user/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash-es';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  userList: any;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private router: Router
  ) { 
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllUsers()
      });
  }

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
       this.dataSource = new MatTableDataSource<any>(_.get(users,'data'))
          this.users = users;
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login')
  }
}
