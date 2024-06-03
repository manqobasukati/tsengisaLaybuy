import type { Store } from '~/models/Store.model';
import { supabase } from '~/superBaseClient';

export async function getStores(): Promise<Store[] | any> {
  const { data: stores, error } = await supabase.from('stores').select('*');

  if (stores) {
    console.log('stores', stores);
    return stores;
  }

  throw error;
}
