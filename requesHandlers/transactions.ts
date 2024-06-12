import type { UserSignUp } from '~/models/User.model';
import { supabase } from '~/superBaseClient';

export async function createTransaction(laybuy_id: string, amount: number) {
  console.log('Add me');
  let { data, error } = await supabase
    .from('transactions')
    .insert([{ laybuy_id: laybuy_id, amount: amount }]);

  if (data) {
    return data;
  }

  return error;
}
