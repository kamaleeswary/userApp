import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`https://reqres.in/api/users`);
  }

register(user: User) {
    return this.http.post(`https://reqres.in/api/register`, user);
}

delete(id: number) {
    return this.http.delete(`https://reqres.in/api/users/${id}`);
}

searchUser(id: number) {
  return this.http.get(`https://reqres.in/api/users/${id}`);
}
}
