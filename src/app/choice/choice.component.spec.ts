import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { FightArenaComponent } from '../fight-arena/fight-arena.component';
import { InfosComponent } from '../infos/infos.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChoiceComponent } from './choice.component';

describe('ChoiceComponent', () => {
  let component: ChoiceComponent;
  let fixture: ComponentFixture<ChoiceComponent>;

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a footer', () => {
    const choiceComponent = TestBed.createComponent(ChoiceComponent);
    choiceComponent.detectChanges();
    const compiled = choiceComponent.nativeElement;
    expect(compiled.querySelector('.footer').textContent).toContain('COPYRIGHTS Ⓒ 2020');
  });
});
