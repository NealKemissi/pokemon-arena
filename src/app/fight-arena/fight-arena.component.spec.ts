import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightArenaComponent } from './fight-arena.component';

describe('FightArenaComponent', () => {
  let component: FightArenaComponent;
  let fixture: ComponentFixture<FightArenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightArenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
