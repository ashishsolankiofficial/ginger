import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistPageComponent } from './productlist-page.component';

describe('ProductlistPageComponent', () => {
  let component: ProductlistPageComponent;
  let fixture: ComponentFixture<ProductlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
