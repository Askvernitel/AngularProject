export class UserDTO {
  constructor(
    public firstName: string | null,
    public lastName: string | null,
    public email: string | null,
    public password: string | null,
    public jobId: string | null,
  ) {}
}
