import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduleDialogComponent } from './delete-schedule-dialog.component';

describe('DeleteScheduleDialogComponent', () => {
  let component: DeleteScheduleDialogComponent;
  let fixture: ComponentFixture<DeleteScheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteScheduleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
