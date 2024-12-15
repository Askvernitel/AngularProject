export class ScheduleDTO {
  constructor(
    public id: number,
    public startTime: Date,
    public endTime: Date,
    public userId: number,
    public firstName: string,
    public lastName: string,
    public jobId: number,
    public jobTitle: string,
    public isApproved: boolean,
  ) {}
}
