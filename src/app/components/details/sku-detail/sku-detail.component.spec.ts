import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuDetailComponent } from './sku-detail.component';

describe('SkuDetailComponent', () => {
  let component: SkuDetailComponent;
  let fixture: ComponentFixture<SkuDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
