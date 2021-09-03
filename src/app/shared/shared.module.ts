import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTransformPipe } from './pipes/unit-transform.pipe';
import { CostTransformPipe } from './pipes/cost-transform.pipe';
import { DecimalPipe } from './pipes/decimal.pipe';

@NgModule({
  declarations: [UnitTransformPipe, CostTransformPipe, DecimalPipe],
  imports: [CommonModule],
  exports: [UnitTransformPipe, CostTransformPipe, DecimalPipe],
})
export class SharedModule {}
