import type { LayBuyItem } from '~/models/LayBuyItem.model';
import { supabase } from '~/superBaseClient';
import type { Store } from '../models/Store.model';

export async function getAllUserBuys(
  user_id: string
): Promise<LayBuyItem[] | any> {
  let { data: laybuys, error } = await supabase
    .from('laybuys')
    .select(
      `
        item_name,
        prize,
        duration,
        deposit_amount, 
        store_id,
        user_id,
        receipt
    `
    )
    .eq('user_id', user_id);



  (laybuys as unknown as LayBuyItem[])?.forEach(async (laybuy) => {
    let { data: store, error } = await supabase
      .from('stores')
      .select("*")
      .eq('id', laybuy.store_id).maybeSingle();
      console.log(store)
    laybuy.store = {StoreZod:{store_name:store?.store_name as string,id:store?.id as string}};
   
  });

  if (laybuys) {
    console.log('Buys', laybuys);
    return laybuys;
  }

  throw error;
}
