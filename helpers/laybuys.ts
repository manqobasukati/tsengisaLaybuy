import type { LayBuyItem } from '~/models/LayBuyItem.model';
import dayjs from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const getDueDate = (timeCreated: Date, Duration: number) => {
  const daysInAmonth = 30.417;
  const days = Duration * daysInAmonth;

  return new Date(timeCreated.setDate(timeCreated.getDate() + days));
};

const newLayBuy = (laybuy: LayBuyItem) => {
  console.log(
    'Active',
    dayjs(getDueDate(new Date(laybuy.created_at), laybuy.duration)).isBetween(
      laybuy.created_at,
      new Date()
    )
  );

  return true;
};
const outStandingLaybuy = (laybuy: LayBuyItem) => {
  return false;
};

const fullyPaidLayBuy = (laybuy: LayBuyItem) => {
  return false;
};

export function LayBuyPageShower(
  activeTab: string,
  laybuy: LayBuyItem
): boolean {
  const options: { [name: string]: boolean } = {
    New: newLayBuy(laybuy),
    Outstanding: outStandingLaybuy(laybuy),
    'Fully Paid': fullyPaidLayBuy(laybuy),
  };

  return options[activeTab];
}
