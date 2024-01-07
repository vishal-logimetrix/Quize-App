import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostYourQueryComponent } from './post-your-query.component';

describe('PostYourQueryComponent', () => {
  let component: PostYourQueryComponent;
  let fixture: ComponentFixture<PostYourQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostYourQueryComponent]
    });
    fixture = TestBed.createComponent(PostYourQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
