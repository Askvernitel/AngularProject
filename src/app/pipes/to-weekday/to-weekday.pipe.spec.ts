import { ToWeekdayPipe } from '@app/pipes';

describe('ToWeekdayPipe', () => {
  it('create an instance', () => {
    const pipe = new ToWeekdayPipe();
    expect(pipe).toBeTruthy();
  });
});
