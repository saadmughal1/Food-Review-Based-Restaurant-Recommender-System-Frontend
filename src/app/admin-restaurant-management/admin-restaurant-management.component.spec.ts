import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantManagementComponent } from './admin-restaurant-management.component';

describe('AdminRestaurantManagementComponent', () => {
  let component: AdminRestaurantManagementComponent;
  let fixture: ComponentFixture<AdminRestaurantManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
