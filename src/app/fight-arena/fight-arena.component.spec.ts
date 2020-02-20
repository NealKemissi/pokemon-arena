import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FightArenaComponent } from './fight-arena.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { InfosComponent } from '../infos/infos.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChoiceComponent } from '../choice/choice.component';
import { APP_BASE_HREF } from '@angular/common';


describe('FightArenaComponent', () => {
  let component: FightArenaComponent;
  let fixture: ComponentFixture<FightArenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FightArenaComponent,
        InfosComponent,
        NavbarComponent,
        ChoiceComponent
      ],
      imports: [
        AppRoutingModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
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
