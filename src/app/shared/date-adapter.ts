import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: any): string {
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${months}-${days}`;
  }
}
