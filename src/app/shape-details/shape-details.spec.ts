import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeDetails } from './shape-details';

describe('ShapeDetails', () => {
  let component: ShapeDetails;
  let fixture: ComponentFixture<ShapeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
