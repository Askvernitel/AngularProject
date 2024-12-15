export class AddScheduleDTO {
  constructor(
    public startTime: Date,
    public endTime: Date,
    public userId: number,
  ) {}
}
