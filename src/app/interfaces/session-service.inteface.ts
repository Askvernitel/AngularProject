/**
 * Interface for session service
 */
export interface ISessionService {
  /**
   * Email of the user
   */
  get email(): string;

  /**
   * Id of the user
   */
  get id(): number;

  /**
   * First name of the user
   */
  get firstName(): string;

  /**
   * Last name of the user
   */
  get lastName(): string;

  /**
   * Role id of the user
   */
  get roleId(): number;
}
