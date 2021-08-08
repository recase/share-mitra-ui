import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public showNav = false;

  constructor() {}

  ngOnInit(): void {}

  public toogleNav(): void {
    this.showNav = !this.showNav;
  }
}
