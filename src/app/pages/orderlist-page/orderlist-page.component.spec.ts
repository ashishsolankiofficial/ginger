import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistPageComponent } from './orderlist-page.component';

describe('OrderlistPageComponent', () => {
  let component: OrderlistPageComponent;
  let fixture: ComponentFixture<OrderlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
