import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinActivityComponent } from './join-activity.component';

describe('JoinActivityComponent', () => {
  let component: JoinActivityComponent;
  let fixture: ComponentFixture<JoinActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
