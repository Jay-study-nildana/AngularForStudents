import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComicComponent } from './create-comic.component';

describe('CreateComicComponent', () => {
  let component: CreateComicComponent;
  let fixture: ComponentFixture<CreateComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComicComponent]
    });
    fixture = TestBed.createComponent(CreateComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
