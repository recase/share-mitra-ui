import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
})
export class SimpleCardComponent implements OnInit {
  @Input() public symbol: string | undefined;
  @Input() public name: string | undefined;
  @Input() public notes: string = '';
  @Input() public exactPrice: number | undefined;
  @Input() public minPrice: number | undefined;
  @Input() public maxPrice: number | undefined;
  @Input() public target: number | undefined;
  @Input() public loss: number | undefined;
  @Input() public editable: boolean = true;
  @Input() public targetLoss: boolean = false;
  @Input() public watchlist: boolean = false;
  @Input() public enableNotification: boolean | undefined;

  @Output() public editEvent: EventEmitter<any> = new EventEmitter();
  @Output() public deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() public notificationEvent: EventEmitter<boolean> =
    new EventEmitter();

  public hasPriceValue: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.exactPrice || this.maxPrice || this.minPrice) {
      this.hasPriceValue = true;
    }
  }

  public editClick() {
    this.editEvent.emit();
  }
  public deleteClick() {
    this.deleteEvent.emit();
  }
  public toggleNotification(value: boolean): void {
    this.notificationEvent.emit(value);
  }
}
