import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJoinActivityComponent } from './card-join-activity.component';

describe('CardJoinActivityComponent', () => {
  let component: CardJoinActivityComponent;
  let fixture: ComponentFixture<CardJoinActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardJoinActivityComponent]
    });
    fixture = TestBed.createComponent(CardJoinActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
