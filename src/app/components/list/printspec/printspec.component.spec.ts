import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintspecComponent } from './printspec.component';

describe('PrintspecComponent', () => {
  let component: PrintspecComponent;
  let fixture: ComponentFixture<PrintspecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintspecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
