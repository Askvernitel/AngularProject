export interface ISessionService {
  getEmail(): string;
  getId(): number;
  getName(): string;
  getLastname(): string;
  getRoleId(): number;
}
