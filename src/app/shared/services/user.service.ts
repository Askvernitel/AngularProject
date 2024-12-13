import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //api stuff
  private readonly userApiEndpoint = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) { }


  public registerUser(user: User) {
    this.http.post<User>(this.userApiEndpoint, user).subscribe(console.log);
  }

  public loginUser(user: User) {
    this.http.post<User>(this.userApiEndpoint, user).subscribe(console.log);
  }





}
