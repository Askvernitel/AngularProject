export class UserWorkerDTO {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public jobId: number | null,
  ) { }
}
