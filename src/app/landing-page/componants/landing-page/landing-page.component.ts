import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) {
  }


  ngOnInit() {
  }

  onHome(): void {
    this.router.navigateByUrl("facesnaps").then(response => response, error => error);
  }

}
