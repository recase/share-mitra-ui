import { Component, OnInit } from '@angular/core';
import { Sector } from 'src/app/interface';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit {
  public sectors: Sector[] = [
    {
      name: 'Banking',
      regulatoryBody: 'Nepal Rastrya Bank',
    },
  ];

  public displayedColumns = ['name', 'regulatorybody'];

  constructor() {}

  ngOnInit(): void {}
}
