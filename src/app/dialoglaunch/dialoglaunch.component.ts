import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialoglaunch',
  templateUrl: './dialoglaunch.component.html',
  styleUrls: ['./dialoglaunch.component.css']
})
export class DialoglaunchComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  start() {
    // this.router.navigate(['flightArena']);
  }

}
