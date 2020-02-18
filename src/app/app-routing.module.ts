import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialoglaunchComponent } from './dialoglaunch/dialoglaunch.component';
import { FightArenaComponent } from './fight-arena/fight-arena.component';

const routes: Routes = [
  {
    path: 'launch',
    component: DialoglaunchComponent
  },
  {
    path: 'flightArena',
    component: FightArenaComponent,
  },
  {
    path: '',
    redirectTo: '/launch',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
