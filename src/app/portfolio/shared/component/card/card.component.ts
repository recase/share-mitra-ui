import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public portfolio!: Portfolio;

  constructor() {}

  ngOnInit(): void {}
}
