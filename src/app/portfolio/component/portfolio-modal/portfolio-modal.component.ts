import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Portfolio } from 'src/app/interface';

@Component({
  selector: 'app-portfolio-modal',
  templateUrl: './portfolio-modal.component.html',
  styleUrls: ['./portfolio-modal.component.scss'],
})
export class PortfolioModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public portfolio: Portfolio,
    private dialogRef: MatDialogRef<PortfolioModalComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.portfolio);
  }

  public closeModal() {
    this.dialogRef.close();
  }
}
