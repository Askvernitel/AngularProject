import { Injectable } from '@angular/core';
import { RoleType } from '@app/enums/role-type';
import { ISessionService } from '@app/interfaces';
import { StorageService } from '@app/services';
import { ParsedJWTClaims } from '@app/types';

/**
 * Session service
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService implements ISessionService {
  /**
   * Claims
   * @private
   */
  #claims: ParsedJWTClaims | undefined;
  /**
   * First name
   * @private
   */
  #firstName: string | undefined;
  /**
   * Last name
   * @private
   */
  #lastName: string | undefined;
  /**
   * Email
   * @private
   */
  #email: string | undefined;
  /**
   * Role id
   * @private
   */
  #roleId: number | undefined;
  /**
   * Id
   * @private
   */
  #id: number | undefined;

  /**
   * Constructor
   * @param storage Storage service
   */
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

  /**
   * Clear session
   * @private
   */
  private handleError() {
    this.storage.removeItem('token');
    //this.router.navigateByUrl(RouterPaths.LOGIN);
  }

  /**
   * Parse JWT claims
   * @param JWTToken
   * @private
   */
  private parseJWTClaims(JWTToken: string): ParsedJWTClaims | undefined {
    try {
      return JSON.parse(atob(JWTToken.split('.')[1]));
    } catch (error) {
      this.handleError();
    }
    return;
  }

  /**
   * Update session
   */
  private update(): void;
  /**
   * Update session
   * @param value {string} Value to update with
   */
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

  /**
   * Check if user is admin using role id
   * @returns {boolean} True if user is admin
   */
  public isAdmin(): boolean {
    const roleId = this.#roleId;
    return roleId === RoleType.ADMIN;
  }

  /**
   * Check if user is worker using role id
   * @returns {boolean} True if user is worker
   */
  public isWorker(): boolean {
    const roleId = this.#roleId;
    return roleId === RoleType.WORKER;
  }

  /**
   * @inheritDoc
   */
  get email(): string {
    return this.#email ?? '';
  }

  /**
   * @inheritDoc
   */
  get id(): number {
    return this.#id ?? 0;
  }

  /**
   * @inheritDoc
   */
  get firstName(): string {
    return this.#firstName ?? '';
  }

  /**
   * @inheritDoc
   */
  get lastName(): string {
    return this.#lastName ?? '';
  }

  /**
   * @inheritDoc
   */
  get roleId(): number {
    return this.#roleId ?? 0;
  }
}
