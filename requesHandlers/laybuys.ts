import type { LayBuyItem, LayBuyItemCreate } from '~/models/LayBuyItem.model';
import { connectionUrl, supabase } from '~/superBaseClient';
import type { Store } from '../models/Store.model';
import { getLoggedInUser } from './users';

export async function createLayBuyItem(item: LayBuyItemCreate) {
  //
  // const
  //TODO first create the store if it does not exist
  const { data: store, error } = await supabase
    .from('stores')
    .select('*')
    .eq('store_name', item.store_name)
    .maybeSingle();

  if (!store) {
    let { data: store, error: storeErr } = await supabase
      .from('stores')
      .upsert({ store_name: item.store_name })
      .select();
  }
  const user_id = getLoggedInUser().id;
  //we need to store image first
  console.log('UserId', user_id);
  const { data: receipt, error: receiptErr } = await supabase.storage
    .from('tsenga')
    .upload(
      `receipts_images/${user_id}_${store.id}_${item.item_name}_${
        (item.receipt as unknown as File).name.split('.')[1]
      }`,
      item.receipt,
      {
        cacheControl: '3600',
        upsert: false,
      }
    );

  const { data: laybuy, error: laybuyErr } = await supabase
    .from('laybuys')
    .insert([
      {
        item_name: item.item_name,
        prize: item.prize,
        duration: item.duration,
        user_id: user_id,
        receipt: `${connectionUrl}/storage/v1/object/public/tsenga/${receipt?.path}`,
        deposit_amount: item.deposit_amount,
        store_id: store.id,
      },
    ]);
  // console.log('Store');
}

export async function getAllUserBuys(
  user_id: string
): Promise<LayBuyItem[] | any> {
  console.log('USER_ID', user_id);
  let { data: laybuys, error } = await supabase
    .from('laybuys')
    .select(
      `
        id,
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

  const items = (laybuys as unknown as LayBuyItem[]).map(async (laybuy) => {
    let { data: store, error: storeError } = await supabase
      .from('stores')
      .select('*')
      .eq('id', laybuy.store_id)
      .maybeSingle();

    let { data: transactions, error: transactionError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('laybuy_id', laybuy.id);

    laybuy.transactions = transactions as any;

    laybuy.store = {
      StoreZod: {
        store_name: store?.store_name as string,
        id: store?.id as string,
      },
    };
    return laybuy;
  });

  if (items) {
    return Promise.all(items);
  }

  throw error;
}
