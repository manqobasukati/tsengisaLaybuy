import type { UserSignUp } from "~/models/User.model";
import { supabase } from "~/superBaseClient";

export async function createUser(user:UserSignUp) {

    let {data,error} = await supabase.auth.signUp({
        email:user.email,
        password:user.password,
        phone:user.phoneNumber,
        // options:{
        //     data:{
        //       displayName:user.fullName
        //     }
        // }
    })

    if(data){
        return data
    }

    return error;
    
}