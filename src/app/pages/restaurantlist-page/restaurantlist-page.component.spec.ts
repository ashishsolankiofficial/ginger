import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantlistPageComponent } from './restaurantlist-page.component';

describe('RestaurantlistPageComponent', () => {
  let component: RestaurantlistPageComponent;
  let fixture: ComponentFixture<RestaurantlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantlistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
