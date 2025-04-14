import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcComicsFormComponent } from './dc-comics-form.component';

describe('DcComicsFormComponent', () => {
  let component: DcComicsFormComponent;
  let fixture: ComponentFixture<DcComicsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DcComicsFormComponent]
    });
    fixture = TestBed.createComponent(DcComicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
