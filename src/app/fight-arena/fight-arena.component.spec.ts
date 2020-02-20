import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FightArenaComponent } from './fight-arena.component';


describe('FightArenaComponent', () => {
  let component: FightArenaComponent;
  let fixture: ComponentFixture<FightArenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FightArenaComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
