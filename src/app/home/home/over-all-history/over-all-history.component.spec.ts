import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverAllHistoryComponent } from './over-all-history.component';

describe('OverAllHistoryComponent', () => {
  let component: OverAllHistoryComponent;
  let fixture: ComponentFixture<OverAllHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverAllHistoryComponent]
    });
    fixture = TestBed.createComponent(OverAllHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
