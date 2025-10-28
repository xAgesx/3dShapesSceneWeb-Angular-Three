import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeControlPanel } from './shape-control-panel';

describe('ShapeControlPanel', () => {
  let component: ShapeControlPanel;
  let fixture: ComponentFixture<ShapeControlPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeControlPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeControlPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
