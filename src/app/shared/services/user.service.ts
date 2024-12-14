import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //api stuff
  private readonly userApiEndpoint = `${environment.apiUrl}/User`;
  private readonly registerUserEndpoint = `${this.userApiEndpoint}/register`;
  private readonly loginUserEndpoint = `${this.userApiEndpoint}/login`;

  constructor(private http: HttpClient) { }


  public registerUser(user: User): Observable<Array<User>> {
    return this.http.post<Array<User>>(this.registerUserEndpoint, user);
  }

  public loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.loginUserEndpoint, user);
  }





}
