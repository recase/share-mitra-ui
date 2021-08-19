import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTransformPipe } from './pipes/unit-transform.pipe';
import { CostTransformPipe } from './pipes/cost-transform.pipe';

@NgModule({
  declarations: [UnitTransformPipe, CostTransformPipe],
  imports: [CommonModule],
  exports: [UnitTransformPipe, CostTransformPipe],
})
export class SharedModule {}
