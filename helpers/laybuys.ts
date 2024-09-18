import type { LayBuyItem } from '~/models/LayBuyItem.model';
import dayjs from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export function evaluateDueDate(laybuy: LayBuyItem): { valid: boolean, days: number } {
  const isItWithinDueDate = dayjs(new Date()).isBetween(
    laybuy.created_at,
    getDueDate(new Date(laybuy.created_at), laybuy.duration)
  );

  return { valid: isItWithinDueDate, days: dayjs(getDueDate(new Date(laybuy.created_at), laybuy.duration)).diff(new Date(), 'days') }
}

const getDueDate = (timeCreated: Date, Duration: number) => {
  const daysInAmonth = 30.417;
  const days = Duration * daysInAmonth;

  return dayjs(timeCreated).add(days, 'day').toDate();
};

const newLayBuy = (laybuy: LayBuyItem) => {

  return dayjs(new Date()).isBetween(
    laybuy.created_at,
    getDueDate(new Date(laybuy.created_at), laybuy.duration)
  );
};
const outStandingLaybuy = (laybuy: LayBuyItem) => {

  const total = laybuy.transactions?.reduce((a: any, b: any) => {

    if (b?.amount) {
      return a + b?.amount;
    }
  }, laybuy.deposit_amount);
  return !dayjs(new Date()).isBetween(
    laybuy.created_at,
    getDueDate(new Date(laybuy.created_at), laybuy.duration)
  ) && !(total === laybuy.prize || total > laybuy.prize);
};

const fullyPaidLayBuy = (laybuy: LayBuyItem) => {

  const total = laybuy.transactions?.reduce((a: any, b: any) => {

    if (b?.amount) {
      return a + b?.amount;
    }
  }, laybuy.deposit_amount);
  return total === laybuy.prize || total > laybuy.prize;
};

export function LayBuyPageShower(
  activeTab: string,
  laybuy: LayBuyItem
): boolean {
  const options: { [name: string]: boolean } = {
    New: newLayBuy(laybuy),
    Outstanding: outStandingLaybuy(laybuy),
    'Paid': fullyPaidLayBuy(laybuy),
  };

  return options[activeTab];
}
