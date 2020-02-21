import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFighterComponent } from './data-fighter.component';

describe('DataFighterComponent', () => {
  let component: DataFighterComponent;
  let fixture: ComponentFixture<DataFighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFighterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
