export class ChangeUserRoleDTO {
  constructor(
    public userId: number,
    public newRoleId: number,
  ) {}
}
