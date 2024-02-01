import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDataActivytyComponent } from './view-data-activyty.component';

describe('ViewDataActivytyComponent', () => {
  let component: ViewDataActivytyComponent;
  let fixture: ComponentFixture<ViewDataActivytyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDataActivytyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDataActivytyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
