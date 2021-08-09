import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/components/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User> | undefined;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) { 
    if (localStorage.getItem('currentUser') === undefined) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = undefined;
    }
}

public get currentUserValue() {
  if (localStorage.getItem('currentUser')) {
    this.currentUserSubject =  new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
    }
  return;
}

logout() {
    this.currentUserSubject = undefined;
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}
}
