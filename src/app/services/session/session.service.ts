import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleType } from '@app/enums/role-type';
import { RouterPaths } from '@app/enums/router-paths';
import { ISessionService } from '@app/interfaces';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements ISessionService {

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }
  private handleError() {
    localStorage.removeItem("token");
    //this.router.navigateByUrl(RouterPaths.LOGIN);
  }
  private parseJWTClaims(JWTToken: string): any {
    return JSON.parse(atob(JWTToken?.split(".")[1]));
  }
  private getClaims(): any {
    let token: string = localStorage.getItem("token") ?? "";
    if (!token) {
      return;
    }
    const claims = this.parseJWTClaims(token);
    if (!claims) {
      this.handleError();
      return;
    }
    return claims
  }

  isAdmin(): boolean {
    const roleId = this.getRoleId();
    return roleId === RoleType.ADMIN;
  }
  isWorker(): boolean {
    const roleId = this.getRoleId();
    return roleId === RoleType.WORKER;
  }

  getName(): string {
    const claims = this.getClaims();
    if (!claims) return "";
    return claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];

  }
  getLastname(): string {
    const claims = this.getClaims();
    if (!claims) return "";
    return claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"];
  }
  getRoleId(): number {
    const claims = this.getClaims();
    if (!claims) return -1;
    return claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  }

  getEmail(): string {
    const claims = this.getClaims();
    if (!claims) return "";
    return claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  }

  getId(): number {
    const claims = this.getClaims();
    if (!claims) return -1;
    return claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

}
