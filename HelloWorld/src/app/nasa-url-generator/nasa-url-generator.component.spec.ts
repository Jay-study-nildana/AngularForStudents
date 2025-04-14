import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaUrlGeneratorComponent } from './nasa-url-generator.component';

describe('NasaUrlGeneratorComponent', () => {
  let component: NasaUrlGeneratorComponent;
  let fixture: ComponentFixture<NasaUrlGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NasaUrlGeneratorComponent]
    });
    fixture = TestBed.createComponent(NasaUrlGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
