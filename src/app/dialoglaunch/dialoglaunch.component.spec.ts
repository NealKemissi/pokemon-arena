import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoglaunchComponent } from './dialoglaunch.component';

describe('DialoglaunchComponent', () => {
  let component: DialoglaunchComponent;
  let fixture: ComponentFixture<DialoglaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoglaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoglaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
