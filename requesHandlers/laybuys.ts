import { supabase } from "~/superBaseClient";

export async function getAllUserBuys(user_id:string) {
    let { data: laybuys, error } = await supabase
  .from('laybuys')
  .select(`
        item_name,
        prize,
        duration,
        deposit_amount, 
        store_id,
        stores (
            store_name
        )
    `)
  .eq('user_id',user_id)
  
  

  if(laybuys){
    console.log("Buys",laybuys)
    return laybuys
  }

  throw error;
}