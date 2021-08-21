import { TransactionType } from '../enums';
import { TransactionTypeData } from '../interface';

export const transactionsTypes: TransactionTypeData[] = [
  {
    label: 'IPO',
    value: TransactionType.IPO,
  },
  {
    label: 'FPO',
    value: TransactionType.FPO,
  },
  {
    label: 'Right Share',
    value: TransactionType.Right,
  },
  {
    label: 'Bonus share',
    value: TransactionType.Bonus,
  },
  {
    label: 'Auction',
    value: TransactionType.Auction,
  },
  {
    label: 'Dividend',
    value: TransactionType.Dividend,
  },
  {
    label: 'On market buy',
    value: TransactionType.BUY,
  },
  {
    label: 'On market sell',
    value: TransactionType.SELL,
  },
];
