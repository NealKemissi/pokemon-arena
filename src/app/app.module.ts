import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightArenaComponent } from './fight-arena/fight-arena.component';
import { InfosComponent } from './infos/infos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BattleServiceService } from './service/battle-service.service';
import { ChoiceComponent } from './choice/choice.component';
import { HttpClientModule } from '@angular/common/http';
import { DataFighterComponent } from './data-fighter/data-fighter.component';

@NgModule({
  declarations: [
    AppComponent,
    FightArenaComponent,
    InfosComponent,
    NavbarComponent,
    ChoiceComponent,
    DataFighterComponent
  ],
  imports: [
    MatGridListModule,
    MatListModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    BattleServiceService
  ],
  exports: [
    DataFighterComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
