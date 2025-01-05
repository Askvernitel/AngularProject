export interface ISessionService {
  get email(): string;
  get id(): number;
  get firstName(): string;
  get lastName(): string;
  get roleId(): number;
}
