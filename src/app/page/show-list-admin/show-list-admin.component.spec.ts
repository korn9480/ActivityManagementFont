import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListAdminComponent } from './show-list-admin.component';

describe('ShowListAdminComponent', () => {
  let component: ShowListAdminComponent;
  let fixture: ComponentFixture<ShowListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
