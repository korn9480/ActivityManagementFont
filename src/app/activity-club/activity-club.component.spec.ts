import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityClubComponent } from './activity-club.component';

describe('ActivityClubComponent', () => {
  let component: ActivityClubComponent;
  let fixture: ComponentFixture<ActivityClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
