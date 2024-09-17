import type { LayBuyItem } from '~/models/LayBuyItem.model';
import dayjs from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const getDueDate = (timeCreated: Date, Duration: number) => {
  const daysInAmonth = 30.417;
  const days = Duration * daysInAmonth;
 
  return dayjs(timeCreated).add(days,'day').toDate();
};

const newLayBuy = (laybuy: LayBuyItem) => {
  console.log(
    `Due Date : ${getDueDate(new Date(laybuy.created_at), laybuy.duration)}, Created: ${dayjs(laybuy.created_at).toDate()}`,
    dayjs( new Date()).isBetween(
      laybuy.created_at,
      getDueDate(new Date(laybuy.created_at), laybuy.duration)
    )
  );

  return  dayjs( new Date()).isBetween(
    laybuy.created_at,
    getDueDate(new Date(laybuy.created_at), laybuy.duration)
  );
};
const outStandingLaybuy = (laybuy: LayBuyItem) => {
  return  !  dayjs( new Date()).isBetween(
    laybuy.created_at,
    getDueDate(new Date(laybuy.created_at), laybuy.duration)
  );;
};

const fullyPaidLayBuy = (laybuy: LayBuyItem) => {

  const total = laybuy.transactions?.reduce((a: any, b: any) => {

    if (b?.amount) {
      return a + b?.amount;
    }
  }, 0);
  return total === laybuy.prize;
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
