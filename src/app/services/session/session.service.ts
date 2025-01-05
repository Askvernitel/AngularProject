import { Injectable } from '@angular/core';
import { RoleType } from '@app/enums/role-type';
import { ISessionService } from '@app/interfaces';
import { StorageService } from '@app/services';
import { ParsedJWTClaims } from '@app/types';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements ISessionService {
  #claims: ParsedJWTClaims | undefined;
  #firstName: string | undefined;
  #lastName: string | undefined;
  #email: string | undefined;
  #roleId: number | undefined;
  #id: number | undefined;

  constructor(private storage: StorageService) {
    this.update();
    storage.changes.subscribe({
      next: ({ key, value }) => {
        if (key == 'token') {
          this.update(value);
        }
      },
    });
  }

  private handleError() {
    this.storage.removeItem('token');
    //this.router.navigateByUrl(RouterPaths.LOGIN);
  }

  private parseJWTClaims(JWTToken: string): ParsedJWTClaims | undefined {
    try {
      return JSON.parse(atob(JWTToken.split('.')[1]));
    } catch (error) {
      this.handleError();
    }
    return;
  }

  private update(): void;
  private update(value: string): void;

  private update(value?: string): void {
    const token: string | null = value ?? localStorage.getItem('token');
    this.#claims = token ? this.parseJWTClaims(token) : undefined;

    this.#email =
      this.#claims?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];

    this.#id = Number(
      this.#claims?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ],
    );

    this.#firstName =
      this.#claims?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
      ];

    this.#lastName =
      this.#claims?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
      ];

    this.#roleId = Number(
      this.#claims?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
    );
  }

  public isAdmin(): boolean {
    const roleId = this.#roleId;
    return roleId === RoleType.ADMIN;
  }

  public isWorker(): boolean {
    const roleId = this.#roleId;
    return roleId === RoleType.WORKER;
  }

  get email(): string {
    return this.#email ?? '';
  }

  get id(): number {
    return this.#id ?? 0;
  }

  get firstName(): string {
    return this.#firstName ?? '';
  }

  get lastName(): string {
    return this.#lastName ?? '';
  }

  get roleId(): number {
    return this.#roleId ?? 0;
  }
}
