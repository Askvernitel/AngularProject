export class GetUsersDTO {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public jobId: number | null,
    public roleId: number,
  ) {}
}
